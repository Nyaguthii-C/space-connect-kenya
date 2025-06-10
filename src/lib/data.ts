import { EventType, OrganizationType, SpaceEvent, EventOrganizer, Contact, AdminStats } from "./types";

export const events: SpaceEvent[] = [
  {
    id: "1",
    name: "Kenya Space Agency",
    title: "Space Exploration Workshop",
    description: "A hands-on workshop exploring the wonders of space.",
    type: "workshop",
    imageUrl: "https://images.unsplash.com/photo-1637978349875-91c149723b3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Nairobi National Museum",
    date: new Date("2024-03-15T10:00:00"),
    organizerId: "1",
    cost: "Free",
    targetAudience: "High School Students",
    capacity: 50,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Martians",
    title: "Astronomy Night",
    description: "An evening of stargazing and learning about constellations.",
    type: "seminar",
    imageUrl: "https://images.unsplash.com/photo-1614485343314-899f58eff981?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Uhuru Park",
    date: new Date("2024-04-20T18:00:00"),
    organizerId: "2",
    cost: "KES 200",
    targetAudience: "General Public",
    capacity: 100,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Rocket Society of Kenya",
    title: "Rocketry Competition",
    description: "A competition where teams design and launch their own rockets.",
    type: "competition",
    imageUrl: "https://images.unsplash.com/photo-1605543489534-f34c69496fa8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Moi International Sports Centre",
    date: new Date("2024-05-25T09:00:00"),
    organizerId: "1",
    cost: "KES 500 per team",
    targetAudience: "University Students",
    capacity: 20,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "AstroTechies",
    title: "Space Technology Exhibition",
    description: "An exhibition showcasing the latest advancements in space technology.",
    type: "exhibition",
    imageUrl: "https://images.unsplash.com/photo-1564854344428-9499674c5ca1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Kenyatta International Conference Centre",
    date: new Date("2024-06-10T10:00:00"),
    organizerId: "3",
    cost: "KES 300",
    targetAudience: "Professionals and Students",
    capacity: 500,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "SpaceSat Kenya",
    title: "Satellite Data Analysis Training",
    description: "A training program on analyzing satellite data for environmental monitoring.",
    type: "training",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "University of Nairobi",
    date: new Date("2024-07-01T09:00:00"),
    organizerId: "2",
    cost: "Free",
    targetAudience: "Researchers and Scientists",
    capacity: 30,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Mars Society of Kenya",
    title: "Mars Rover Design Challenge",
    description: "Design and build a Mars rover prototype.",
    type: "competition",
    imageUrl: "https://plus.unsplash.com/premium_photo-1663052674474-a58309c98d31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Technical University of Kenya",
    date: new Date("2024-08-15T10:00:00"),
    organizerId: "1",
    cost: "KES 400 per team",
    targetAudience: "Engineering Students",
    capacity: 25,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Satlyt Africa LTD",
    title: "Space Law Seminar",
    description: "A seminar on the legal aspects of space exploration and resource utilization.",
    type: "seminar",
    imageUrl: "https://images.unsplash.com/photo-1542744166-e35939358f7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Strathmore University",
    date: new Date("2024-09-20T14:00:00"),
    organizerId: "3",
    cost: "KES 800",
    targetAudience: "Law Students and Professionals",
    capacity: 80,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Astro Educators Kenya",
    title: "Cosmic Photography Workshop",
    description: "Learn how to capture stunning images of the night sky.",
    type: "workshop",
    imageUrl: "https://images.unsplash.com/photo-1619532473437-4a8141924414?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Lake Nakuru National Park",
    date: new Date("2024-10-05T19:00:00"),
    organizerId: "2",
    cost: "KES 1200",
    targetAudience: "Photography Enthusiasts",
    capacity: 15,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "9",
    name: "Space Club Nairobi",
    title: "International Space Station Talk",
    description: "A talk about the current research and life aboard the ISS.",
    type: "seminar",
    imageUrl: "https://images.unsplash.com/photo-1606164069434-943949a2eb4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Alliance Française",
    date: new Date("2024-11-12T16:00:00"),
    organizerId: "3",
    cost: "KES 250",
    targetAudience: "General Public",
    capacity: 120,
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "10",
    name: "Aerospace Solutions",
    title: "Space Habitat Design Competition",
    description: "Design a sustainable habitat for future space settlements.",
    type: "competition",
    imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Jomo Kenyatta University of Agriculture and Technology",
    date: new Date("2024-12-01T10:00:00"),
    organizerId: "1",
    cost: "KES 600 per team",
    targetAudience: "Architecture and Engineering Students",
    capacity: 18,
    contacts: [],
    createdAt: new Date(),
  },
];

export const organizers: EventOrganizer[] = [
  {
    id: "1",
    name: "Space Explorers Society of Kenya",
    type: "non-profit",
    email: "info@spacekenya.org",
    phone: "+254712345678",
    description: "Promoting space education and exploration in Kenya.",
    logoUrl: "https://images.unsplash.com/photo-1637978349875-91c149723b3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    websiteUrl: "https://spacekenya.org",
    events: [],
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Kenya Astronomy Club",
    type: "educational",
    email: "contact@astronomyke.com",
    phone: "+254722333444",
    description: "Bringing astronomy to the Kenyan community.",
    logoUrl: "https://images.unsplash.com/photo-1614485343314-899f58eff981?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    websiteUrl: "https://astronomyke.com",
    events: [],
    contacts: [],
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Ministry of Space and Technology",
    type: "government",
    email: "info@spacegov.go.ke",
    phone: "+254733444555",
    description: "Advancing space technology and research in Kenya.",
    logoUrl: "https://images.unsplash.com/photo-1564854344428-9499674c5ca1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    websiteUrl: "https://spacegov.go.ke",
    events: [],
    contacts: [],
    createdAt: new Date(),
  },
];

export const getEventById = (id: string): SpaceEvent | undefined => {
  return events.find((event) => event.id === id);
};

export const getOrganizerById = (id: string): EventOrganizer | undefined => {
  return organizers.find((organizer) => organizer.id === id);
};

export const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>): Contact => {
  const newContact: Contact = {
    id: Date.now().toString(),
    createdAt: new Date(),
    ...contact,
  };

  return newContact;
};

export const addOrganizerContact = (contactData: {
  name: string;
  phone: string;
  message: string;
  eventId: string;
  organizerId: string;
}) => {
  const newContact = {
    id: Date.now().toString(),
    name: contactData.name,
    phone: contactData.phone,
    message: contactData.message,
    eventId: contactData.eventId,
    createdAt: new Date(),
  };

  // Find the organizer and add the contact
  const organizer = organizers.find(org => org.id === contactData.organizerId);
  if (organizer) {
    organizer.contacts.push(newContact);
  }

  return newContact;
};

export const addEvent = (eventData: Omit<SpaceEvent, 'id' | 'createdAt' | 'contacts' | 'organizer'>) => {
  const newEvent: SpaceEvent = {
    id: Date.now().toString(),
    createdAt: new Date(),
    contacts: [],
    ...eventData,
  };

  events.push(newEvent);

  // Add event to organizer's events list
  const organizer = organizers.find(org => org.id === eventData.organizerId);
  if (organizer) {
    organizer.events.push(newEvent);
  }

  return newEvent;
};

export const addOrganizer = (organizerData: Omit<EventOrganizer, 'id' | 'createdAt' | 'events' | 'contacts'>) => {
  const newOrganizer: EventOrganizer = {
    id: Date.now().toString(),
    createdAt: new Date(),
    events: [],
    contacts: [],
    ...organizerData,
  };

  organizers.push(newOrganizer);
  return newOrganizer;
};

export const getAdminStats = (): AdminStats => {
  // Calculate event types
  const eventsByType = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate organizer types
  const organizersByType = organizers.reduce((acc, organizer) => {
    acc[organizer.type] = (acc[organizer.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get total contacts across all events and organizers
  const totalContacts = events.reduce((sum, event) => sum + event.contacts.length, 0) +
                       organizers.reduce((sum, organizer) => sum + organizer.contacts.length, 0);

  // Get recent events (last 10)
  const recentEvents = events
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10)
    .map(event => ({
      ...event,
      organizer: organizers.find(org => org.id === event.organizerId)
    }));

  // Get recent organizers (last 10)
  const recentOrganizers = organizers
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);

  return {
    totalEvents: events.length,
    totalOrganizers: organizers.length,
    totalContacts,
    eventsByType,
    organizersByType,
    recentEvents,
    recentOrganizers,
  };
};
