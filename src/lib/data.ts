import { Contact, EventOrganizer, SpaceEvent } from "./types";

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Mock organizer data
export const organizers: EventOrganizer[] = [
  {
    id: generateId(),
    name: "Kenya Space Agency",
    type: "government",
    email: "info@ksa.go.ke",
    phone: "+254700000001",
    description: "Kenya's premier space research and exploration agency.",
    logoUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=100&auto=format&fit=crop",
    websiteUrl: "https://ksa.go.ke",
    events: [],
    contacts: [],
    createdAt: new Date("2023-01-15"),
  },
  {
    id: generateId(),
    name: "Astronomy Kenya",
    type: "non-profit",
    email: "hello@astronomykenya.org",
    phone: "+254700000002",
    description: "Promoting astronomy education and outreach across Kenya.",
    logoUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=100&auto=format&fit=crop",
    events: [],
    contacts: [],
    createdAt: new Date("2023-02-20"),
  },
  {
    id: generateId(),
    name: "Space Explorers Club",
    type: "educational",
    email: "contact@spaceexplorers.co.ke",
    phone: "+254700000003",
    description: "Inspiring the next generation of space explorers in East Africa.",
    logoUrl: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=100&auto=format&fit=crop",
    events: [],
    contacts: [],
    createdAt: new Date("2023-03-10"),
  },
  {
    id: generateId(),
    name: "Dr. Aisha Ndonga",
    type: "individual",
    email: "aisha.ndonga@gmail.com",
    phone: "+254700000004",
    description: "Astrophysicist and science communicator offering workshops and talks.",
    logoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    events: [],
    contacts: [],
    createdAt: new Date("2023-04-05"),
  },
  {
    id: generateId(),
    name: "AstroTech Solutions",
    type: "private",
    email: "info@astrotech.co.ke",
    phone: "+254700000005",
    description: "Providing space technology solutions and educational programs.",
    logoUrl: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=100&auto=format&fit=crop",
    events: [],
    contacts: [],
    createdAt: new Date("2023-05-15"),
  }
];

// Mock event data
export const events: SpaceEvent[] = [
  {
    id: generateId(),
    title: "Introduction to Stargazing",
    description: "A beginner-friendly workshop on how to identify stars, planets, and constellations in the night sky.",
    type: "workshop",
    imageUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000&auto=format&fit=crop",
    location: "Nairobi Arboretum",
    date: new Date("2023-06-15T18:00:00"),
    endDate: new Date("2023-06-15T21:00:00"),
    organizerId: organizers[1].id,
    cost: "Free",
    targetAudience: "General public, age 8+",
    capacity: 50,
    contacts: [],
    createdAt: new Date("2023-05-20"),
  },
  {
    id: generateId(),
    title: "Space Careers Seminar",
    description: "Learn about diverse career opportunities in the space sector from industry professionals.",
    type: "seminar",
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000&auto=format&fit=crop",
    location: "University of Nairobi, Main Campus",
    date: new Date("2023-07-10T09:00:00"),
    endDate: new Date("2023-07-10T16:00:00"),
    organizerId: organizers[0].id,
    cost: "KES 500",
    targetAudience: "University students and young professionals",
    capacity: 200,
    contacts: [],
    createdAt: new Date("2023-06-01"),
  },
  {
    id: generateId(),
    title: "Satellite Development Workshop",
    description: "Hands-on workshop on the basics of CubeSat design and programming.",
    type: "training",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop",
    location: "iHub, Nairobi",
    date: new Date("2023-08-05T10:00:00"),
    endDate: new Date("2023-08-07T16:00:00"),
    organizerId: organizers[4].id,
    cost: "KES 5,000",
    targetAudience: "STEM students and professionals",
    capacity: 30,
    contacts: [],
    createdAt: new Date("2023-07-01"),
  },
  {
    id: generateId(),
    title: "Space Science for Kids",
    description: "Fun, interactive activities to introduce children to basic concepts in astronomy and space science.",
    type: "workshop",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421789ea0?q=80&w=1000&auto=format&fit=crop",
    location: "Sarit Centre, Westlands",
    date: new Date("2023-09-20T14:00:00"),
    endDate: new Date("2023-09-20T17:00:00"),
    organizerId: organizers[2].id,
    cost: "KES 1,000",
    targetAudience: "Children ages 6-12",
    capacity: 40,
    contacts: [],
    createdAt: new Date("2023-08-15"),
  },
  {
    id: generateId(),
    title: "Cosmic Perspectives: An Evening with Dr. Aisha Ndonga",
    description: "Dr. Ndonga shares insights on recent astronomical discoveries and their implications for our understanding of the universe.",
    type: "seminar",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop",
    location: "Alliance Française, Nairobi",
    date: new Date("2023-10-12T18:30:00"),
    endDate: new Date("2023-10-12T20:30:00"),
    organizerId: organizers[3].id,
    cost: "KES 1,500",
    targetAudience: "Adults interested in space science",
    capacity: 100,
    contacts: [],
    createdAt: new Date("2023-09-01"),
  },
  {
    id: generateId(),
    title: "Kenya Space Expo 2023",
    description: "Annual exhibition showcasing space technology innovation, research, and educational opportunities in Kenya.",
    type: "exhibition",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    location: "KICC, Nairobi",
    date: new Date("2023-11-18T09:00:00"),
    endDate: new Date("2023-11-20T17:00:00"),
    organizerId: organizers[0].id,
    cost: "KES 2,000",
    targetAudience: "All space enthusiasts",
    capacity: 500,
    contacts: [],
    createdAt: new Date("2023-10-01"),
  },
  {
    id: generateId(),
    title: "National Astronomy Competition",
    description: "Annual competition for secondary school students to showcase their knowledge and projects in astronomy.",
    type: "competition",
    imageUrl: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1000&auto=format&fit=crop",
    location: "Kenya Science Campus, UoN",
    date: new Date("2023-12-05T08:00:00"),
    endDate: new Date("2023-12-05T17:00:00"),
    organizerId: organizers[1].id,
    cost: "KES 500 per team",
    targetAudience: "Secondary school students",
    capacity: 150,
    contacts: [],
    createdAt: new Date("2023-11-01"),
  },
  {
    id: generateId(),
    title: "Astrophotography Workshop",
    description: "Learn to capture stunning images of celestial objects with your camera or smartphone.",
    type: "workshop",
    imageUrl: "https://images.unsplash.com/photo-1502318217862-aa4e294ba657?q=80&w=1000&auto=format&fit=crop",
    location: "Naivasha, Crater Lake",
    date: new Date("2024-01-15T16:00:00"),
    endDate: new Date("2024-01-15T22:00:00"),
    organizerId: organizers[2].id,
    cost: "KES 3,500",
    targetAudience: "Photography enthusiasts",
    capacity: 20,
    contacts: [],
    createdAt: new Date("2023-12-15"),
  }
];

// Add dummy contacts to the first organizer
const dummyContacts: Contact[] = [
  {
    id: generateId(),
    name: "John Kamau",
    email: "john.kamau@gmail.com",
    phone: "+254712345678",
    message: "Interested in space workshops",
    eventId: events[0]?.id || generateId(),
    createdAt: new Date("2023-06-01"),
  },
  {
    id: generateId(),
    name: "Mary Wanjiku",
    email: "mary.wanjiku@outlook.com",
    phone: "+254723456789",
    message: "Would like to attend astronomy events",
    eventId: events[1]?.id || generateId(),
    createdAt: new Date("2023-06-05"),
  },
  {
    id: generateId(),
    name: "David Ochieng",
    email: "david.ochieng@yahoo.com",
    phone: "+254734567890",
    message: "Interested in satellite workshops",
    eventId: events[2]?.id || generateId(),
    createdAt: new Date("2023-06-10"),
  },
  {
    id: generateId(),
    name: "Grace Akinyi",
    email: "grace.akinyi@gmail.com",
    phone: "+254745678901",
    message: "Looking for kids space programs",
    eventId: events[3]?.id || generateId(),
    createdAt: new Date("2023-06-15"),
  },
  {
    id: generateId(),
    name: "Peter Mwangi",
    email: "peter.mwangi@hotmail.com",
    phone: "+254756789012",
    message: "Professional development in space tech",
    eventId: events[4]?.id || generateId(),
    createdAt: new Date("2023-06-20"),
  }
];

// Add dummy contacts to the first organizer
organizers[0].contacts = dummyContacts;

// Link events to organizers
events.forEach(event => {
  const organizer = organizers.find(org => org.id === event.organizerId);
  if (organizer) {
    organizer.events.push(event);
    event.organizer = organizer;
  }
});

export const getEventById = (id: string): SpaceEvent | undefined => {
  return events.find(event => event.id === id);
};

export const getOrganizerById = (id: string): EventOrganizer | undefined => {
  return organizers.find(org => org.id === id);
};

export const addContact = (contact: Omit<Contact, "id" | "createdAt">): Contact => {
  const newContact: Contact = {
    ...contact,
    id: generateId(),
    createdAt: new Date(),
  };
  
  const event = events.find(e => e.id === contact.eventId);
  if (event) {
    event.contacts.push(newContact);
    
    const organizer = organizers.find(org => org.id === event.organizerId);
    if (organizer) {
      organizer.contacts.push(newContact);
    }
  }
  
  return newContact;
};

export const addOrganizer = (organizer: Omit<EventOrganizer, "id" | "events" | "contacts" | "createdAt">): EventOrganizer => {
  const newOrganizer: EventOrganizer = {
    ...organizer,
    id: generateId(),
    events: [],
    contacts: [],
    createdAt: new Date(),
  };
  
  organizers.push(newOrganizer);
  return newOrganizer;
};

export const addEvent = (event: Omit<SpaceEvent, "id" | "contacts" | "createdAt">): SpaceEvent => {
  const newEvent: SpaceEvent = {
    ...event,
    id: generateId(),
    contacts: [],
    createdAt: new Date(),
  };
  
  events.push(newEvent);
  
  const organizer = organizers.find(org => org.id === event.organizerId);
  if (organizer) {
    organizer.events.push(newEvent);
  }
  
  return newEvent;
};

export const getAdminStats = (): any => {
  const eventsByType: Record<string, number> = {};
  const organizersByType: Record<string, number> = {};
  
  events.forEach(event => {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
  });
  
  organizers.forEach(org => {
    organizersByType[org.type] = (organizersByType[org.type] || 0) + 1;
  });
  
  const totalContacts = organizers.reduce((total, org) => total + org.contacts.length, 0);
  
  return {
    totalEvents: events.length,
    totalOrganizers: organizers.length,
    totalContacts,
    eventsByType,
    organizersByType,
    recentEvents: [...events].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5),
    recentOrganizers: [...organizers].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5),
  };
};
