
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SpaceEvent } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { addContact, addOrganizerContact, getOrganizerById } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventModalProps {
  event: SpaceEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  const { toast } = useToast();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showOrganizerContactForm, setShowOrganizerContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [organizerContactData, setOrganizerContactData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  if (!event) return null;

  const organizer = getOrganizerById(event.organizerId);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactData.name || !contactData.phone) {
      toast({
        title: "Error",
        description: "Name and phone number are required",
        variant: "destructive",
      });
      return;
    }
    
    addContact({
      ...contactData,
      eventId: event.id,
    });
    
    toast({
      title: "Success!",
      description: "Your information has been sent to the organizer. They will contact you soon.",
    });
    
    setContactData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    
    setShowContactForm(false);
  };

  const handleSubmitOrganizerContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!organizerContactData.name || !organizerContactData.phone) {
      toast({
        title: "Error",
        description: "Name and phone number are required",
        variant: "destructive",
      });
      return;
    }
    
    addOrganizerContact({
      name: organizerContactData.name,
      phone: organizerContactData.phone,
      message: organizerContactData.message,
      eventId: event.id,
      organizerId: event.organizerId,
    });
    
    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${organizer?.name}`,
    });
    
    setOrganizerContactData({
      name: "",
      phone: "",
      message: ""
    });
    
    setShowOrganizerContactForm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-56 overflow-hidden -mt-6 -mx-6 mb-4 rounded-t-lg">
          <img
            src={event.imageUrl || "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1000&auto=format&fit=crop"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</Badge>
          </div>
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription>
            Organized by {organizer?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm">
                {format(new Date(event.date), "MMMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>
          
          {event.targetAudience && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">For {event.targetAudience}</span>
            </div>
          )}
          
          <div className="bg-card p-4 rounded-lg">
            <p className="text-sm whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {event.cost && (
              <div className="bg-muted p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Cost</p>
                <p className="font-medium">{event.cost}</p>
              </div>
            )}
            
            {event.capacity && (
              <div className="bg-muted p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Capacity</p>
                <p className="font-medium">{event.capacity} attendees</p>
              </div>
            )}
          </div>
          
          {showContactForm && (
            <div className="bg-card border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-3">Register Interest</h4>
              <form onSubmit={handleSubmitContact} className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input 
                    id="name" 
                    value={contactData.name}
                    onChange={e => setContactData({...contactData, name: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={contactData.email}
                    onChange={e => setContactData({...contactData, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    value={contactData.phone}
                    onChange={e => setContactData({...contactData, phone: e.target.value})}
                    placeholder="+254 700 000000"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    rows={2}
                    value={contactData.message}
                    onChange={e => setContactData({...contactData, message: e.target.value})}
                    placeholder="Any questions or additional information..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Submit</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {showOrganizerContactForm && (
            <div className="bg-card border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-3">Contact Organizer</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Send a message to {organizer?.name} about "{event.title}"
              </p>
              <form onSubmit={handleSubmitOrganizerContact} className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="organizerContactName">Your Name *</Label>
                  <Input 
                    id="organizerContactName" 
                    value={organizerContactData.name}
                    onChange={e => setOrganizerContactData({...organizerContactData, name: e.target.value})}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="organizerContactPhone">Phone Number *</Label>
                  <Input 
                    id="organizerContactPhone" 
                    value={organizerContactData.phone}
                    onChange={e => setOrganizerContactData({...organizerContactData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="organizerContactMessage">Message *</Label>
                  <Textarea
                    id="organizerContactMessage"
                    rows={4}
                    value={organizerContactData.message}
                    onChange={e => setOrganizerContactData({...organizerContactData, message: e.target.value})}
                    placeholder="Write your message to the organizer..."
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Send Message</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowOrganizerContactForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {!showContactForm && !showOrganizerContactForm && (
            <>
              <Button 
                className="w-full sm:flex-1" 
                onClick={() => setShowContactForm(true)}
              >
                Register Interest
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:flex-1"
                onClick={() => setShowOrganizerContactForm(true)}
              >
                Contact Organizer
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
