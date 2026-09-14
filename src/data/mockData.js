/**
 * QUEUELESS — Mock Database Entities
 * Academic Project V1: Browser-side data designed to mirror future DBMS entities:
 * USER, ORGANISATION, BRANCH, SERVICE, QUEUE, TOKEN, COUNTER, STAFF
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', count: 12 },
  { id: 'Hospital', name: 'Hospitals', icon: 'Building2', count: 2 },
  { id: 'Clinic', name: 'Clinics', icon: 'HeartPulse', count: 2 },
  { id: 'Bank', name: 'Banks', icon: 'Landmark', count: 2 },
  { id: 'Government', name: 'Government Offices', icon: 'FileText', count: 2 },
  { id: 'Diagnostic', name: 'Diagnostic Centres', icon: 'Activity', count: 2 },
  { id: 'Salon', name: 'Salons & Spas', icon: 'Scissors', count: 2 },
  { id: 'College', name: 'College Offices', icon: 'GraduationCap', count: 2 },
  { id: 'Service', name: 'Service Centres', icon: 'Wrench', count: 2 },
];

export const INITIAL_ORGANISATIONS = [
  {
    id: 1,
    name: 'City Care General Hospital',
    category: 'Hospital',
    location: 'Sector 17, City Centre',
    address: 'Plot 42, Health Avenue, Sector 17',
    phone: '+91 98765 43210',
    operatingHours: '08:00 AM - 08:00 PM',
    queue: 24,
    currentToken: 142,
    counters: 4,
    activeCounters: 3,
    averageServiceTime: 6, // minutes
    estimatedWait: 48, // 24 * 6 / 3
    rating: 4.8,
    description: 'Premier multi-speciality tertiary care center providing round-the-clock emergency, outpatient, and diagnostic services.',
    services: [
      'General OPD Consultation',
      'Pediatric Care',
      'Cardiology OPD',
      'Pharmacy Dispensing',
      'Billing & Discharge Desk'
    ]
  },
  {
    id: 2,
    name: 'Apex Diagnostic & MRI Centre',
    category: 'Diagnostic',
    location: 'Park Street, Downtown',
    address: '88 Park Road, Opposite Metro Gate 3',
    phone: '+91 98765 11223',
    operatingHours: '07:00 AM - 09:00 PM',
    queue: 14,
    currentToken: 89,
    counters: 3,
    activeCounters: 2,
    averageServiceTime: 5,
    estimatedWait: 35, // 14 * 5 / 2
    rating: 4.7,
    description: 'State-of-the-art diagnostic imaging, high-speed MRI scans, full-body health checkups, and pathology test center.',
    services: [
      'Routine Blood & Urine Test',
      'Digital X-Ray',
      'Ultrasound Scan',
      'MRI & CT Scan Booking',
      'Sample Collection Counter'
    ]
  },
  {
    id: 3,
    name: 'National Commercial Bank',
    category: 'Bank',
    location: 'Financial District, Mall Road',
    address: 'Tower A, Ground Floor, FinTech Complex',
    phone: '+91 98765 88990',
    operatingHours: '10:00 AM - 04:00 PM',
    queue: 8,
    currentToken: 215,
    counters: 5,
    activeCounters: 4,
    averageServiceTime: 4,
    estimatedWait: 8, // 8 * 4 / 4
    rating: 4.5,
    description: 'Leading national public bank branch handling retail banking, foreign remittances, locker management, and loan sanctions.',
    services: [
      'Cash Deposit & Withdrawal',
      'Cheque Clearance & DD Issuance',
      'Account Opening & KYC Update',
      'Foreign Exchange Services',
      'Loan Verification Desk'
    ]
  },
  {
    id: 4,
    name: 'Regional Transport & Licensing Office (RTO)',
    category: 'Government',
    location: 'Administrative Complex, West Wing',
    address: 'Civil Secretariat Square, Highway 44',
    phone: '+91 98765 33445',
    operatingHours: '09:30 AM - 04:30 PM',
    queue: 38,
    currentToken: 304,
    counters: 4,
    activeCounters: 3,
    averageServiceTime: 7,
    estimatedWait: 89, // 38 * 7 / 3
    rating: 3.9,
    description: 'Government motor vehicle department issuing driving licences, international permits, fitness certificates, and vehicle registrations.',
    services: [
      'Learner Licence Biometrics',
      'Permanent Driving Licence Test Slot',
      'Vehicle RC Transfer & Hypothecation',
      'Permit & Fitness Certificate Renewal',
      'Challan Payment & Clearance'
    ]
  },
  {
    id: 5,
    name: 'St. Jude Dental & Orthodontic Clinic',
    category: 'Clinic',
    location: 'Greenwood Plaza, East End',
    address: 'Suite 204, Greenwood Commercial Center',
    phone: '+91 98765 99887',
    operatingHours: '09:00 AM - 07:00 PM',
    queue: 5,
    currentToken: 42,
    counters: 2,
    activeCounters: 2,
    averageServiceTime: 8,
    estimatedWait: 20, // 5 * 8 / 2
    rating: 4.9,
    description: 'Modern cosmetic dental clinic focusing on painless root canals, braces, aligners, tooth whitening, and oral checkups.',
    services: [
      'Routine Dental Checkup & Cleaning',
      'Tooth Extraction Consultation',
      'Orthodontic Braces Adjustment',
      'Pediatric Dental Consultation',
      'X-Ray & Tooth Cavity Filling'
    ]
  },
  {
    id: 6,
    name: 'Urban Luxe Unisex Salon & Spa',
    category: 'Salon',
    location: 'High Street Galleria, Sector 9',
    address: 'Shop 12, Level 1, Galleria Mall',
    phone: '+91 98765 77665',
    operatingHours: '10:00 AM - 09:00 PM',
    queue: 9,
    currentToken: 67,
    counters: 4,
    activeCounters: 3,
    averageServiceTime: 12,
    estimatedWait: 36, // 9 * 12 / 3
    rating: 4.6,
    description: 'Contemporary beauty parlor and barbershop delivering haircut styling, beard grooming, facials, hair spa, and massage therapies.',
    services: [
      'Classic Haircut & Beard Trim',
      'Hair Coloring & Keratin Therapy',
      'Revitalizing Facial & Cleanup',
      'Manicure & Pedicure Spa',
      'Bridal & Groom Styling Consultation'
    ]
  },
  {
    id: 7,
    name: 'University Student Services & Registrar',
    category: 'College',
    location: 'University North Campus',
    address: 'Administrative Block, Ground Floor, Gate 1',
    phone: '+91 98765 66554',
    operatingHours: '09:00 AM - 03:30 PM',
    queue: 21,
    currentToken: 110,
    counters: 3,
    activeCounters: 3,
    averageServiceTime: 4,
    estimatedWait: 28, // 21 * 4 / 3
    rating: 4.2,
    description: 'University single-window student facilitation desk for transcripts, degree verification, scholarship validation, and exam fee clearance.',
    services: [
      'Official Transcript & Certificate Issuance',
      'Semester Exam Fee & Hall Ticket Desk',
      'Scholarship Document Attestation',
      'Identity Card Replacement',
      'Course Re-evaluation Submission'
    ]
  },
  {
    id: 8,
    name: 'FastFix Electronics & Laptop Service Centre',
    category: 'Service',
    location: 'Cyber Hub Tech Park, Sector 5',
    address: 'Unit 3B, IT Tower B, Electronic City',
    phone: '+91 98765 55443',
    operatingHours: '10:00 AM - 07:30 PM',
    queue: 12,
    currentToken: 53,
    counters: 3,
    activeCounters: 2,
    averageServiceTime: 8,
    estimatedWait: 48, // 12 * 8 / 2
    rating: 4.4,
    description: 'Authorized gadget service center specializing in laptop hardware repairs, mobile screen replacements, warranty verification, and data recovery.',
    services: [
      'Device Inward Inspection & Job Sheet',
      'Battery & Screen Replacement Desk',
      'Warranty Claim & Repair Status Check',
      'Repaired Device Pickup Counter',
      'Accessory Purchase & Advisory'
    ]
  },
  {
    id: 9,
    name: 'Municipal Passport Seva Kendra',
    category: 'Government',
    location: 'Outer Ring Road, South Sector',
    address: 'Passport Bhavan, Near Metro Junction',
    phone: '+91 98765 22334',
    operatingHours: '09:00 AM - 05:00 PM',
    queue: 44,
    currentToken: 420,
    counters: 6,
    activeCounters: 5,
    averageServiceTime: 6,
    estimatedWait: 53, // 44 * 6 / 5
    rating: 4.1,
    description: 'Central portal for new passport applications, tatkaal verification, police clearance certificates, and biometric enrolments.',
    services: [
      'Document Verification Counter A',
      'Biometric Fingerprint & Photo Counter B',
      'Granting Officer Verification Counter C',
      'Enquiry & Escalation Desk'
    ]
  },
  {
    id: 10,
    name: 'Metro Smile Dental & Implant Centre',
    category: 'Clinic',
    location: 'Metro Junction, Station Road',
    address: 'Corner House, Beside Station Exit 2',
    phone: '+91 98765 88776',
    operatingHours: '10:00 AM - 08:00 PM',
    queue: 4,
    currentToken: 29,
    counters: 2,
    activeCounters: 2,
    averageServiceTime: 10,
    estimatedWait: 20,
    rating: 4.8,
    description: 'Specialized dental clinic for dental implants, wisdom tooth surgery, laser teeth whitening, and smile design procedures.',
    services: [
      'Consultation & Digital OPG X-Ray',
      'Dental Implant Assessment',
      'Cosmetic Smile Makeover Consultation',
      'Post-Treatment Follow-up Desk'
    ]
  },
  {
    id: 11,
    name: 'State Bank of India — Treasury Branch',
    category: 'Bank',
    location: 'Treasury Complex, Old City',
    address: 'Heritage Square, Near Clock Tower',
    phone: '+91 98765 33221',
    operatingHours: '10:00 AM - 04:00 PM',
    queue: 19,
    currentToken: 178,
    counters: 4,
    activeCounters: 3,
    averageServiceTime: 5,
    estimatedWait: 32,
    rating: 4.3,
    description: 'Historical main branch handling government treasury receipts, pension disbursements, corporate banking, and bullion desk.',
    services: [
      'Pension Verification & Passbook Update',
      'Government Challan Deposit',
      'Senior Citizen Priority Counter',
      'New FD & Mutual Fund Advisory'
    ]
  },
  {
    id: 12,
    name: 'Horizon Diagnostic Pathology Lab',
    category: 'Diagnostic',
    location: 'Civil Lines, Medical Enclave',
    address: '14 Doctors Colony, Civil Lines',
    phone: '+91 98765 44556',
    operatingHours: '06:30 AM - 08:30 PM',
    queue: 11,
    currentToken: 75,
    counters: 3,
    activeCounters: 3,
    averageServiceTime: 4,
    estimatedWait: 15,
    rating: 4.7,
    description: 'ISO-certified pathology reference laboratory offering same-day blood report delivery, home sample collection, and allergy panels.',
    services: [
      'Blood Sample Collection (Fasting)',
      'Report Collection & Doctor Consultation',
      'Thyroid & Diabetes Profile Desk',
      'Preventive Health Package Registration'
    ]
  }
];

export const DEMO_USERS = [
  {
    id: 101,
    name: 'Alex Johnson',
    email: 'user@example.com',
    password: '123456',
    role: 'CUSTOMER',
    phone: '+91 98765 00001',
    joinedDate: '2024-01-15',
    status: 'ACTIVE'
  },
  {
    id: 201,
    name: 'Sarah Miller',
    email: 'staff@example.com',
    password: '123456',
    role: 'STAFF',
    organisationId: 1,
    organisationName: 'City Care General Hospital',
    counterNumber: 2,
    phone: '+91 98765 00002',
    joinedDate: '2023-11-01',
    status: 'ACTIVE'
  },
  {
    id: 301,
    name: 'David Clark',
    email: 'admin@example.com',
    password: '123456',
    role: 'ADMIN',
    phone: '+91 98765 00003',
    joinedDate: '2023-06-10',
    status: 'ACTIVE'
  },
  {
    id: 102,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: '123456',
    role: 'CUSTOMER',
    phone: '+91 98765 00004',
    joinedDate: '2024-02-20',
    status: 'ACTIVE'
  },
  {
    id: 202,
    name: 'Rohan Gupta',
    email: 'rohan.staff@example.com',
    password: '123456',
    role: 'STAFF',
    organisationId: 2,
    organisationName: 'Apex Diagnostic & MRI Centre',
    counterNumber: 1,
    phone: '+91 98765 00005',
    joinedDate: '2023-12-05',
    status: 'ACTIVE'
  }
];

export const MOCK_USERS = DEMO_USERS;

export const INITIAL_STAFF_COUNTERS = [
  { id: 1, number: 1, name: 'Counter 1 - General Inquiry', status: 'ACTIVE', currentServingToken: 140, staffName: 'Dr. Emily Watson' },
  { id: 2, number: 2, name: 'Counter 2 - Specialist OPD', status: 'ACTIVE', currentServingToken: 141, staffName: 'Sarah Miller' },
  { id: 3, number: 3, name: 'Counter 3 - Pharmacy & Billing', status: 'ACTIVE', currentServingToken: 142, staffName: 'Mark Stevens' },
  { id: 4, number: 4, name: 'Counter 4 - Rapid Triage', status: 'OFFLINE', currentServingToken: null, staffName: 'Unassigned' }
];

export const INITIAL_QUEUE_HISTORY = [
  {
    id: 'hist-1',
    tokenNumber: 139,
    organisationName: 'City Care General Hospital',
    customer: 'Rahul Verma',
    service: 'General OPD Consultation',
    counter: 'Counter 1',
    joinedTime: '09:15 AM',
    completedTime: '09:42 AM',
    duration: '27 mins',
    date: 'Today',
    status: 'COMPLETED'
  },
  {
    id: 'hist-2',
    tokenNumber: 138,
    organisationName: 'City Care General Hospital',
    customer: 'Meera Kapoor',
    service: 'Pediatric Care',
    counter: 'Counter 2',
    joinedTime: '09:05 AM',
    completedTime: '09:35 AM',
    duration: '30 mins',
    date: 'Today',
    status: 'COMPLETED'
  },
  {
    id: 'hist-3',
    tokenNumber: 137,
    organisationName: 'Apex Diagnostic & MRI Centre',
    customer: 'Arun Nair',
    service: 'Billing & Discharge Desk',
    counter: 'Counter 3',
    joinedTime: '08:50 AM',
    completedTime: '09:20 AM',
    duration: '30 mins',
    date: 'Yesterday',
    status: 'COMPLETED'
  },
  {
    id: 'hist-4',
    tokenNumber: 136,
    organisationName: 'National Trust Bank',
    customer: 'Sunita Rao',
    service: 'Cardiology OPD',
    counter: 'Counter 2',
    joinedTime: '08:40 AM',
    completedTime: '09:10 AM',
    duration: '30 mins',
    date: 'Yesterday',
    status: 'COMPLETED'
  }
];

export const MOCK_HISTORY = INITIAL_QUEUE_HISTORY;
