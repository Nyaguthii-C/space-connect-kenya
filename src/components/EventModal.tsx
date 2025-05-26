
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
import { addContact } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventModalProps {
  event: SpaceEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  const { toast } = useToast();
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  if (!event) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <div className="relative w-full h-56 overflow-hidden -mt-6 -mx-6 mb-4 rounded-t-lg flex-shrink-0">
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
        
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription>
            Organized by {event.organizer?.name}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-6">
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
            
            {showContactForm ? (
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
                      rows={3}
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
            ) : null}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          {!showContactForm && (
            <>
              <Button 
                className="w-full sm:flex-1" 
                onClick={() => setShowContactForm(true)}
              >
                Register Interest
              </Button>
              {event.organizer?.phone && (
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => window.open(`tel:${event.organizer?.phone}`)}
                >
                  Contact Organizer
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
