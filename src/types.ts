export type Language = 'fi' | 'en';

export interface ServiceItem {
  id: string;
  category: 'hair' | 'beard' | 'combo' | 'special';
  nameFi: string;
  nameEn: string;
  descFi: string;
  descEn: string;
  price: number;
  durationMinutes: number;
  popular?: boolean;
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

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  price: number;
  status: 'confirmed' | 'completed' | 'in-progress';
  createdAt: string;
}

export interface AnalyticsSummary {
  todayRevenue: number;
  weeklyRevenue: number;
  totalBookingsToday: number;
  completedToday: number;
  activeChairs: number;
  totalChairs: number;
  occupancyRate: number;
  averageSatisfaction: number;
  totalReviews: number;
  hourlyTraffic: {
    hour: string;
    bookings: number;
    capacity: number;
  }[];
  popularServices: {
    nameFi: string;
    nameEn: string;
    count: number;
    percentage: number;
  }[];
  recentActivity: {
    id: string;
    type: 'booking' | 'complete' | 'checkin';
    customerName: string;
    serviceName: string;
    barberName: string;
    timeAgo: string;
    timestamp: number;
  }[];
}
