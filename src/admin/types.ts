
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
