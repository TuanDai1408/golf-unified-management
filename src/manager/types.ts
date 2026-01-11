
export type PageId = 'tee-sheet' | 'members' | 'finances' | 'reports' | 'settings' | 'courses' | 'staff' | 'pricing';

export interface Booking {
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
