export type Language = 'fi' | 'en';

export interface ServiceItem {
  id: string;
  categoryId: string;
  categoryNameFi: string;
  categoryNameEn: string;
  nameFi: string;
  nameEn: string;
  fullTitleFi: string;
  priceDisplay: string;
  aika24Url: string;
  popular?: boolean;
  descFi?: string;
  descEn?: string;
}

export interface ServiceCategory {
  id: string;
  nameFi: string;
  nameEn: string;
  icon: string;
  services: ServiceItem[];
}

export interface Barber {
  id: string;
  name: string;
  roleFi: string;
  roleEn: string;
  experienceYears: number;
  bioFi: string;
  bioEn: string;
  specialtiesFi: string[];
  specialtiesEn: string[];
  image: string;
  status: 'available' | 'busy' | 'break';
  currentClient?: string;
  stationNumber: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  initials: string;
  avatarBg: string;
  rating: number;
  dateFi: string;
  dateEn: string;
  commentFi: string;
  commentEn: string;
  serviceFi: string;
  serviceEn: string;
  source: string;
  googleReviewUrl: string;
}

