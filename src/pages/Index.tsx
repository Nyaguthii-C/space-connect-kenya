
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import EventModal from "@/components/EventModal";
import RegistrationModal from "@/components/RegistrationModal";
import Footer from "@/components/Footer";
import { events, getEventById } from "@/lib/data";
import { SpaceEvent } from "@/lib/types";

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (eventId: string) => {
    const event = getEventById(eventId);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  // Get unique event types for filtering
  const eventTypes = Array.from(new Set(events.map(event => event.type)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="events-section" className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Space Activities</h2>
              <p className="text-muted-foreground">
                Discover and connect with space events and educational activities across Kenya
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-primary/50">All</Button>
              {eventTypes.map((type) => (
                <Button 
                  key={type} 
                  variant="outline" 
                  size="sm"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button variant="outline">Load More</Button>
          </div>
        </section>
        
        <section className="bg-card border-y border-border py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Are you a space educator or organization?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Share your space events, workshops, and educational services with the Kenyan community through our platform.
            </p>
            <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent("open-registration-modal"))}>
              Add Your Event or Service
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <EventModal 
        event={selectedEvent} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <RegistrationModal />
    </div>
  );
};

export default Index;
