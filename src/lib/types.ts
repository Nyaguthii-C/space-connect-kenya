
export type EventType = "workshop" | "seminar" | "exhibition" | "competition" | "training" | "other";
export type OrganizationType = "educational" | "non-profit" | "government" | "private" | "individual" | "other";

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone: string;
  message?: string;
  eventId: string;
  createdAt: Date;
}

export interface EventOrganizer {
  id: string;
  name: string;
  type: OrganizationType;
  email: string;
  phone: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  events: SpaceEvent[];
  contacts: Contact[];
  createdAt: Date;
}

export interface SpaceEvent {
  id: string;
  name: string;
  title: string;
  description: string;
  type: EventType;
  imageUrl?: string;
  location: string;
  date: Date;
  endDate?: Date;
  organizerId: string;
  organizer?: EventOrganizer;
  cost?: string;
  targetAudience?: string;
  capacity?: number;
  contacts: Contact[];
  createdAt: Date;
}

export interface AdminStats {
  totalEvents: number;
  totalOrganizers: number;
  totalContacts: number;
  eventsByType: Record<string, number>;
  organizersByType: Record<string, number>;
  recentEvents: SpaceEvent[];
  recentOrganizers: EventOrganizer[];
}
