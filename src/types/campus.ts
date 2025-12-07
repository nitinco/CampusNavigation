export interface Building {
  id: string;
  name: string;
  code: string;
  type: 'academic' | 'administrative' | 'residence' | 'recreation' | 'dining' | 'hostel' | 'utility';
  description: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  address: string;
  facilities?: string[];
}

export interface Location {
  id: string;
  name: string;
  buildingId: string;
  floor?: number;
  room?: string;
}
