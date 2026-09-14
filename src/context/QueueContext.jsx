import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  INITIAL_ORGANISATIONS,
  INITIAL_STAFF_COUNTERS,
  INITIAL_QUEUE_HISTORY
} from '../data/mockData.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { calculateEstimatedWait, getQueueStatus } from '../services/api.js';

const QueueContext = createContext(null);

export function QueueProvider({ children }) {
  // Organisations state persisted in localStorage
  const [organisations, setOrganisations] = useLocalStorage(
    'queueless_organisations',
    INITIAL_ORGANISATIONS
  );

  // Active user ticket persisted in localStorage
  const [activeTicket, setActiveTicket] = useLocalStorage(
    'queueless_active_ticket',
    null
  );

  // User favourites array of organisation IDs persisted in localStorage
  const [favourites, setFavourites] = useLocalStorage(
    'queueless_favourites',
    [1, 2] // Initial demo favourites
  );

  // Staff counters state
  const [counters, setCounters] = useLocalStorage(
    'queueless_staff_counters',
    INITIAL_STAFF_COUNTERS
  );

  // Queue history records
  const [queueHistory, setQueueHistory] = useLocalStorage(
    'queueless_queue_history',
    INITIAL_QUEUE_HISTORY
  );

  // Simulation controls
  const [simulationActive, setSimulationActive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(() => new Date().toLocaleTimeString());

  /**
   * Helper to recalculate queue metadata for an organisation
   */
  const enrichOrg = useCallback((org) => {
    const estWait = calculateEstimatedWait(org.queue, org.averageServiceTime, org.activeCounters);
    return {
      ...org,
      estimatedWait: estWait,
      statusInfo: getQueueStatus(org.queue, estWait)
    };
  }, []);

  /**
   * Background Real-Time Simulation Loop
   * Fires every 7 seconds when active.
   * Simulates active tokens advancing and waiting line processing.
   */
  useEffect(() => {
    if (!simulationActive) return;

    const intervalId = setInterval(() => {
      setOrganisations((prevOrgs) => {
        // Randomly pick 1-2 active organisations to advance
        const updated = prevOrgs.map((org) => {
          // 40% chance this organisation advances in this simulation step
          if (Math.random() < 0.45 && org.activeCounters > 0) {
            let nextQueue = org.queue;
            let nextToken = org.currentToken;

            if (nextQueue > 0) {
              nextQueue -= 1;
              nextToken += 1;
            } else {
              // Replenish line if it hits 0 so demo remains dynamic
              nextQueue = Math.floor(Math.random() * 10) + 8;
            }

            const estWait = calculateEstimatedWait(
              nextQueue,
              org.averageServiceTime,
              org.activeCounters
            );

            return {
              ...org,
              queue: nextQueue,
              currentToken: nextToken,
              estimatedWait: estWait
            };
          }
          return org;
        });
        return updated;
      });

      setLastUpdated(new Date().toLocaleTimeString());
    }, 7000);

    return () => clearInterval(intervalId);
  }, [simulationActive, setOrganisations]);

  /**
   * Synchronize user's active ticket with the simulated queue of their chosen organisation
   */
  useEffect(() => {
    if (!activeTicket || activeTicket.status === 'COMPLETED') return;

    const matchedOrg = organisations.find((o) => o.id === activeTicket.organisationId);
    if (!matchedOrg) return;

    const diff = activeTicket.tokenNumber - matchedOrg.currentToken;

    if (diff <= 0 && activeTicket.status === 'WAITING') {
      // It's the user's turn!
      setActiveTicket((prev) => ({
        ...prev,
        status: 'SERVING',
        peopleAhead: 0,
        estimatedWait: 0
      }));
    } else if (diff < -2 && activeTicket.status === 'SERVING') {
      // Completed visit
      setActiveTicket((prev) => ({
        ...prev,
        status: 'COMPLETED',
        completedTime: new Date().toLocaleTimeString()
      }));
    } else if (activeTicket.status === 'WAITING') {
      const dynamicWait = calculateEstimatedWait(
        diff,
        matchedOrg.averageServiceTime,
        matchedOrg.activeCounters
      );
      setActiveTicket((prev) => ({
        ...prev,
        currentToken: matchedOrg.currentToken,
        peopleAhead: Math.max(0, diff),
        estimatedWait: dynamicWait
      }));
    }
  }, [organisations, activeTicket, setActiveTicket]);

  /**
   * Join a queue at an organisation
   */
  const joinQueue = useCallback(
    ({ organisationId, organisationName, service }) => {
      const targetOrg = organisations.find((o) => o.id === Number(organisationId));
      if (!targetOrg) throw new Error('Organisation not found');

      // User's token is current token + current queue + 1
      const generatedToken = targetOrg.currentToken + targetOrg.queue + 1;
      const initialPeopleAhead = targetOrg.queue;
      const initialWait = calculateEstimatedWait(
        initialPeopleAhead,
        targetOrg.averageServiceTime,
        targetOrg.activeCounters
      );

      const newTicket = {
        id: `TKT-${Date.now().toString().slice(-6)}`,
        organisationId: targetOrg.id,
        organisationName: targetOrg.name,
        category: targetOrg.category,
        location: targetOrg.location,
        service: service || targetOrg.services[0],
        tokenNumber: generatedToken,
        currentToken: targetOrg.currentToken,
        peopleAhead: initialPeopleAhead,
        estimatedWait: initialWait,
        joinedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'WAITING' // 'WAITING' | 'SERVING' | 'COMPLETED'
      };

      // Increase the organisation's queue count by 1
      setOrganisations((prev) =>
        prev.map((org) =>
          org.id === targetOrg.id
            ? {
                ...org,
                queue: org.queue + 1,
                estimatedWait: calculateEstimatedWait(
                  org.queue + 1,
                  org.averageServiceTime,
                  org.activeCounters
                )
              }
            : org
        )
      );

      setActiveTicket(newTicket);
      return newTicket;
    },
    [organisations, setActiveTicket, setOrganisations]
  );

  /**
   * Leave or cancel current active queue ticket
   */
  const cancelQueue = useCallback(() => {
    if (!activeTicket) return;
    setOrganisations((prev) =>
      prev.map((org) => {
        if (org.id === activeTicket.organisationId && org.queue > 0) {
          const nextQueue = org.queue - 1;
          return {
            ...org,
            queue: nextQueue,
            estimatedWait: calculateEstimatedWait(
              nextQueue,
              org.averageServiceTime,
              org.activeCounters
            )
          };
        }
        return org;
      })
    );
    setActiveTicket(null);
  }, [activeTicket, setActiveTicket, setOrganisations]);

  /**
   * Staff action: advance to Next Token
   */
  const nextStaffToken = useCallback(
    (orgId = 1) => {
      setOrganisations((prev) =>
        prev.map((org) => {
          if (org.id === Number(orgId)) {
            const nextQueue = Math.max(0, org.queue - 1);
            const nextToken = org.currentToken + 1;
            const estWait = calculateEstimatedWait(
              nextQueue,
              org.averageServiceTime,
              org.activeCounters
            );

            // Record to history
            const record = {
              token: org.currentToken,
              customer: `Customer #${org.currentToken}`,
              service: org.services[0] || 'General Service',
              counter: `Counter ${Math.floor(Math.random() * org.activeCounters) + 1}`,
              joinedTime: 'Recent',
              completedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              waitTime: `${org.averageServiceTime + Math.floor(Math.random() * 5)} mins`,
              status: 'COMPLETED'
            };

            setQueueHistory((hist) => [record, ...hist.slice(0, 19)]);

            return {
              ...org,
              queue: nextQueue,
              currentToken: nextToken,
              estimatedWait: estWait
            };
          }
          return org;
        })
      );
      setLastUpdated(new Date().toLocaleTimeString());
    },
    [setOrganisations, setQueueHistory]
  );

  /**
   * Staff action: move back to Previous Token (for correction)
   */
  const prevStaffToken = useCallback(
    (orgId = 1) => {
      setOrganisations((prev) =>
        prev.map((org) => {
          if (org.id === Number(orgId) && org.currentToken > 1) {
            const nextQueue = org.queue + 1;
            const nextToken = org.currentToken - 1;
            const estWait = calculateEstimatedWait(
              nextQueue,
              org.averageServiceTime,
              org.activeCounters
            );
            return {
              ...org,
              queue: nextQueue,
              currentToken: nextToken,
              estimatedWait: estWait
            };
          }
          return org;
        })
      );
      setLastUpdated(new Date().toLocaleTimeString());
    },
    [setOrganisations]
  );

  /**
   * Staff action: Toggle counter between ACTIVE and OFFLINE
   */
  const toggleCounter = useCallback(
    (counterId, orgId = 1) => {
      setCounters((prevCounters) => {
        const nextCounters = prevCounters.map((c) =>
          c.id === counterId
            ? { ...c, status: c.status === 'ACTIVE' ? 'OFFLINE' : 'ACTIVE' }
            : c
        );

        const activeCount = nextCounters.filter((c) => c.status === 'ACTIVE').length;

        // Update organisation active counters count
        setOrganisations((prevOrgs) =>
          prevOrgs.map((org) => {
            if (org.id === Number(orgId)) {
              const safeActive = Math.max(1, activeCount);
              return {
                ...org,
                activeCounters: safeActive,
                estimatedWait: calculateEstimatedWait(
                  org.queue,
                  org.averageServiceTime,
                  safeActive
                )
              };
            }
            return org;
          })
        );

        return nextCounters;
      });
    },
    [setCounters, setOrganisations]
  );

  /**
   * Toggle Favourite Organisation
   */
  const toggleFavourite = useCallback(
    (orgId) => {
      setFavourites((prev) => {
        const idNum = Number(orgId);
        if (prev.includes(idNum)) {
          return prev.filter((id) => id !== idNum);
        } else {
          return [...prev, idNum];
        }
      });
    },
    [setFavourites]
  );

  const isFavourite = useCallback(
    (orgId) => favourites.includes(Number(orgId)),
    [favourites]
  );

  /**
   * Enriched organisations list with status badges & calculated waiting times
   */
  const enrichedOrganisations = useMemo(() => {
    return organisations.map(enrichOrg);
  }, [organisations, enrichOrg]);

  const value = useMemo(
    () => ({
      organisations: enrichedOrganisations,
      rawOrganisations: organisations,
      activeTicket,
      favourites,
      counters,
      queueHistory,
      simulationActive,
      lastUpdated,
      setSimulationActive,
      joinQueue,
      cancelQueue,
      nextStaffToken,
      prevStaffToken,
      toggleCounter,
      toggleFavourite,
      isFavourite
    }),
    [
      enrichedOrganisations,
      organisations,
      activeTicket,
      favourites,
      counters,
      queueHistory,
      simulationActive,
      lastUpdated,
      joinQueue,
      cancelQueue,
      nextStaffToken,
      prevStaffToken,
      toggleCounter,
      toggleFavourite,
      isFavourite
    ]
  );

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}
