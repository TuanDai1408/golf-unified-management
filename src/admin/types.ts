
export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
  icon: string;
}

export enum BookingStatus {
  Confirmed = 'Confirmed',
  Pending = 'Pending',
  Canceled = 'Canceled'
}

export enum ClubStatus {
  Open = 'Open',
  Maintenance = 'Maintenance',
  Closed = 'Closed'
}

export interface Booking {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  teeTime: string;
  date: string;
  course: string;
  players: number;
  price: string;
  status: BookingStatus;
}

export interface Club {
  id: string;
  name: string;
  location: string;
  holes: number;
  par: number;
  status: ClubStatus;
  bookings: string;
  revenue: string;
  image: string;
}

// Manager Specific Types
export type PageId = 'tee-sheet' | 'members' | 'finances' | 'reports' | 'settings' | 'courses' | 'staff' | 'pricing';

export interface TeeSheetBooking {
  id: string;
  player: string;
  time: string;
  pax: number;
  holes: number;
  cart: boolean;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in';
  payment: 'paid' | 'unpaid' | 'due' | 'at-counter' | 'refunded';
  refId: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer' | 'Contributor';
  permissions: string[];
  status: 'active' | 'inactive';
  avatar: string;
}

export interface ActivityLogItem {
  id: string;
  user: string;
  action: string;
  target?: string;
  time: string;
  type: 'update' | 'system' | 'invite' | 'login';
}

export interface PricingSlot {
  id: string;
  time: string;
  label: string;
  baseRate: number;
  isMaintenance?: boolean;
}
