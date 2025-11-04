export interface Location {
  id: string;
  name: string;
  category: 'Academic' | 'Hostel' | 'Sports' | 'Facility' | 'Administrative' | 'Other';
  description: string;
  coordinates: [number, number]; 
  icon?: string;
}

export interface Route {
  distance: number;
  duration: number;
  path: [number, number][];
}

export const SAMPLE_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Administrative Block',
    category: 'Administrative',
    description: 'Main administrative building with offices of Vice Chancellor, Registrar, and other administrative staff.',
    coordinates: [25.1860, 75.8055]
  },
  {
    id: '2',
    name: 'Main Entrance Gate',
    category: 'Facility',
    description: 'Primary entrance to RTU campus with security checkpoint.',
    coordinates: [25.1845, 75.8040]
  },
  {
    id: '3',
    name: 'Central Library',
    category: 'Academic',
    description: 'State-of-the-art library with over 100,000 books, journals, and digital resources.',
    coordinates: [25.1865, 75.8065]
  },
  {
    id: '4',
    name: 'Engineering Block A',
    category: 'Academic',
    description: 'Computer Science and Electronics Engineering departments with modern labs.',
    coordinates: [25.1870, 75.8070]
  },
  {
    id: '5',
    name: 'Boys Hostel 1',
    category: 'Hostel',
    description: 'Residential facility for male students with dining hall and common areas.',
    coordinates: [25.1855, 75.8080]
  },
  {
    id: '6',
    name: 'Girls Hostel',
    category: 'Hostel',
    description: 'Residential facility for female students with all modern amenities.',
    coordinates: [25.1850, 75.8075]
  },
  {
    id: '7',
    name: 'Sports Complex',
    category: 'Sports',
    description: 'Multi-sport facility with cricket ground, basketball court, and indoor games.',
    coordinates: [25.1875, 75.8050]
  },
  {
    id: '8',
    name: 'Cafeteria',
    category: 'Facility',
    description: 'Main campus cafeteria serving breakfast, lunch, and snacks.',
    coordinates: [25.1862, 75.8060]
  },
  {
    id: '9',
    name: 'Auditorium',
    category: 'Facility',
    description: 'Large auditorium for events, seminars, and cultural programs with 500+ capacity.',
    coordinates: [25.1868, 75.8058]
  },
  {
    id: '10',
    name: 'Medical Center',
    category: 'Facility',
    description: 'Campus health center with doctors and emergency medical services.',
    coordinates: [25.1852, 75.8068]
  }
];

export const RTU_CENTER: [number, number] = [25.1860, 75.8060];
