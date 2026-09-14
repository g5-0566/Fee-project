/**
 * QUEUELESS — Mock API Service Layer
 * Simulates async HTTP client calls using ES6 Promises and async/await.
 * Designed to seamlessly transition to fetch('/api/...') in future V2 backend integration.
 */

import { INITIAL_ORGANISATIONS, CATEGORIES, DEMO_USERS } from '../data/mockData.js';

// Helper to simulate network latency realistically (50-200ms)
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

// Storage keys for browser persistence
const ORGS_STORAGE_KEY = 'queueless_organisations';

/**
 * Get current organisations from localStorage or initial seed
 */
export const getStoredOrganisations = () => {
  try {
    const raw = localStorage.getItem(ORGS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to parse stored organisations:', err);
  }
  // Initialize with seed
  localStorage.setItem(ORGS_STORAGE_KEY, JSON.stringify(INITIAL_ORGANISATIONS));
  return INITIAL_ORGANISATIONS;
};

/**
 * Save updated organisations back to localStorage
 */
export const saveStoredOrganisations = (organisations) => {
  try {
    localStorage.setItem(ORGS_STORAGE_KEY, JSON.stringify(organisations));
  } catch (err) {
    console.error('Failed to save organisations to storage:', err);
  }
};

/**
 * Calculate Estimated Waiting Time according to spec:
 * Estimated Wait = People Waiting × Average Service Time ÷ Active Counters
 */
export const calculateEstimatedWait = (peopleWaiting, avgServiceTime, activeCounters) => {
  const safeCounters = Math.max(1, Number(activeCounters) || 1);
  const safePeople = Math.max(0, Number(peopleWaiting) || 0);
  const safeAvg = Math.max(1, Number(avgServiceTime) || 5);
  return Math.round((safePeople * safeAvg) / safeCounters);
};

/**
 * Compute Queue Status:
 * LOW: 0–10 people, Estimated wait < 15 minutes
 * MODERATE: 11–30 people, Estimated wait 15–45 minutes
 * BUSY: 31+ people, Estimated wait > 45 minutes
 */
export const getQueueStatus = (peopleWaiting, estimatedWait) => {
  const people = Number(peopleWaiting) || 0;
  const wait = Number(estimatedWait) || 0;

  if (people <= 10 && wait < 15) {
    return {
      code: 'LOW',
      label: 'LOW',
      description: 'Quick service, short queue',
      colorClass: 'badge-low',
      dotClass: 'status-dot-low'
    };
  } else if (people <= 30 && wait <= 45) {
    return {
      code: 'MODERATE',
      label: 'MODERATE',
      description: 'Moderate waiting duration',
      colorClass: 'badge-moderate',
      dotClass: 'status-dot-moderate'
    };
  } else {
    return {
      code: 'BUSY',
      label: 'BUSY',
      description: 'Heavy rush, higher waiting time',
      colorClass: 'badge-busy',
      dotClass: 'status-dot-busy'
    };
  }
};

/**
 * Fetch all organisations
 */
export const getOrganisations = async () => {
  await delay(100);
  const orgs = getStoredOrganisations();
  return orgs.map(org => {
    const estWait = calculateEstimatedWait(org.queue, org.averageServiceTime, org.activeCounters);
    return {
      ...org,
      estimatedWait: estWait,
      statusInfo: getQueueStatus(org.queue, estWait)
    };
  });
};

/**
 * Fetch single organisation by ID
 */
export const getOrganisationById = async (id) => {
  await delay(80);
  const orgs = getStoredOrganisations();
  const found = orgs.find(o => o.id === Number(id));
  if (!found) {
    throw new Error(`Organisation with ID ${id} not found.`);
  }
  const estWait = calculateEstimatedWait(found.queue, found.averageServiceTime, found.activeCounters);
  return {
    ...found,
    estimatedWait: estWait,
    statusInfo: getQueueStatus(found.queue, estWait)
  };
};

/**
 * Fetch queue details for an organisation
 */
export const getQueue = async (id) => {
  await delay(60);
  const org = await getOrganisationById(id);
  return {
    organisationId: org.id,
    organisationName: org.name,
    queue: org.queue,
    currentToken: org.currentToken,
    estimatedWait: org.estimatedWait,
    activeCounters: org.activeCounters,
    statusInfo: org.statusInfo,
    lastUpdated: new Date().toLocaleTimeString()
  };
};

/**
 * Fetch available services for an organisation
 */
export const getServices = async (id) => {
  await delay(50);
  const org = await getOrganisationById(id);
  return org.services || [];
};

/**
 * Fetch all categories
 */
export const getCategories = async () => {
  await delay(40);
  return CATEGORIES;
};

/**
 * Simulated authentication login verification
 */
export const loginUser = async (email, password) => {
  await delay(150);
  const normalizedEmail = email.trim().toLowerCase();
  
  // Check demo users or registered users stored in localStorage
  let allUsers = [...DEMO_USERS];
  try {
    const customUsers = JSON.parse(localStorage.getItem('queueless_registered_users') || '[]');
    allUsers = [...DEMO_USERS, ...customUsers];
  } catch (err) {
    console.warn('Error reading registered users:', err);
  }

  const found = allUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!found) {
    throw new Error('No account found with this email address.');
  }
  if (found.password !== password) {
    throw new Error('Incorrect password. Please verify your credentials.');
  }

  // Return safe user object (excluding password)
  const { password: _, ...safeUser } = found;
  return safeUser;
};

/**
 * Simulated user registration
 */
export const registerUser = async ({ name, email, password, role = 'CUSTOMER', phone = '' }) => {
  await delay(150);
  const normalizedEmail = email.trim().toLowerCase();
  
  let allUsers = [...DEMO_USERS];
  let customUsers = [];
  try {
    customUsers = JSON.parse(localStorage.getItem('queueless_registered_users') || '[]');
    allUsers = [...DEMO_USERS, ...customUsers];
  } catch (err) {
    console.warn('Error reading registered users:', err);
  }

  if (allUsers.some(u => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error('An account with this email address already exists.');
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    phone: phone.trim() || '+91 98765 00000',
    joinedDate: new Date().toISOString().split('T')[0],
    status: 'ACTIVE'
  };

  customUsers.push(newUser);
  localStorage.setItem('queueless_registered_users', JSON.stringify(customUsers));

  const { password: _, ...safeUser } = newUser;
  return safeUser;
};
