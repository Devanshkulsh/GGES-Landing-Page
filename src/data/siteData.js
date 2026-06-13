import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Code2,
  Cpu,
  FlaskConical,
  Handshake,
  Home,
  Mail,
  Rocket,
  Target,
  UserRound,
} from 'lucide-react'

export const programs = {
  BBA: {
    title: 'Bachelor of Business Administration',
    duration: '3 Years',
    demand: 85,
    salary: 78,
    growth: 90,
    range: '\u20B93.5 LPA - \u20B912 LPA',
    icon: BriefcaseBusiness,
    careers: ['Marketing Manager', 'Business Analyst', 'HR Executive', 'Entrepreneur', 'Finance Analyst', 'Operations Lead'],
  },
  BCA: {
    title: 'Bachelor of Computer Applications',
    duration: '3 Years',
    demand: 92,
    salary: 86,
    growth: 94,
    range: '\u20B94 LPA - \u20B914 LPA',
    icon: Code2,
    careers: ['Software Developer', 'Data Analyst', 'UI/UX Designer', 'Cloud Engineer', 'QA Engineer', 'Product Associate'],
  },
  MBA: {
    title: 'Master of Business Administration',
    duration: '2 Years',
    demand: 90,
    salary: 92,
    growth: 88,
    range: '\u20B95.8 LPA - \u20B918 LPA',
    icon: BarChart3,
    careers: ['Product Manager', 'Strategy Consultant', 'HR Manager', 'Brand Manager', 'Finance Manager', 'Business Lead'],
  },
  MCA: {
    title: 'Master of Computer Applications',
    duration: '2 Years',
    demand: 94,
    salary: 90,
    growth: 96,
    range: '\u20B95 LPA - \u20B918 LPA',
    icon: Cpu,
    careers: ['Full Stack Engineer', 'AI Engineer', 'Data Scientist', 'DevOps Engineer', 'Tech Lead', 'Security Analyst'],
  },
  'B.Pharm': {
    title: 'Bachelor of Pharmacy',
    duration: '4 Years',
    demand: 88,
    salary: 76,
    growth: 91,
    range: '\u20B93.5 LPA - \u20B910 LPA',
    icon: FlaskConical,
    careers: ['Drug Inspector', 'Clinical Researcher', 'Medical Writer', 'QA Analyst', 'Pharmacist', 'Production Officer'],
  },
  'D.Pharm': {
    title: 'Diploma in Pharmacy',
    duration: '2 Years',
    demand: 84,
    salary: 70,
    growth: 86,
    range: '\u20B92.8 LPA - \u20B98 LPA',
    icon: FlaskConical,
    careers: ['Hospital Pharmacist', 'Drug Technician', 'Store Manager', 'Lab Assistant', 'Sales Executive', 'Health Inspector'],
  },
}

export const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'programs', label: 'Programs', icon: BookOpen },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'placements', label: 'Placements', icon: BarChart3 },
  { id: 'admissions', label: 'Admissions', icon: Building2 },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export const journeySteps = [
  { title: 'Admission', description: 'Enroll into future-ready programs with simple guided steps.', icon: Target },
  { title: 'Learning', description: 'Master core concepts through immersive, modern curriculum.', icon: Cpu },
  { title: 'Projects', description: 'Build real-world projects to apply learning practically.', icon: Code2 },
  { title: 'Internship', description: 'Gain hands-on experience with leading industry partners.', icon: Handshake },
  { title: 'Industry Training', description: 'Sharpen job-ready skills with specialized tracks.', icon: Building2 },
  { title: 'Placement', description: 'Get placed with top recruiters through dedicated support.', icon: BriefcaseBusiness },
  { title: 'Career Success', description: 'Launch a thriving career and grow into a future leader.', icon: Rocket },
]

export const heroChips = [
  { label: 'BBA', className: 'c1', duration: 4.2 },
  { label: 'BCA', className: 'c2', duration: 4.8 },
  { label: 'MBA', className: 'c3', duration: 5.1 },
  { label: 'MCA', className: 'c4', duration: 4.5 },
  { label: 'B.Pharm', className: 'c5', duration: 5.3 },
  { label: 'D.Pharm', className: 'c6', duration: 4.6 },
]

export const companies = ['TCS', 'Infosys', 'Wipro', 'HCL', 'Deloitte', 'HDFC Bank', 'Cipla', 'Sun Pharma', 'Amazon', 'Flipkart', 'Accenture', 'Cognizant', 'Tech Mahindra', 'Capgemini']

export const contactNumbers = {
  professional: '918299199937',
  pharmacy: '8429733270',
}

export const courseContactOptions = [
  {
    id: 'professional',
    label: 'Professional Courses',
    subtitle: 'BBA, BCA, MBA, MCA',
    number: contactNumbers.professional,
    introMessage: 'Hi! I want to know more about the professional courses at GGES.',
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy Courses',
    subtitle: 'B.Pharm and D.Pharm',
    number: contactNumbers.pharmacy,
    introMessage: 'Hi! I want to know more about the pharmacy courses at GGES.',
  },
]
