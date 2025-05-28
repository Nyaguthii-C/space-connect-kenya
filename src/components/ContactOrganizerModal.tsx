
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SpaceEvent } from "@/lib/types";
import { addOrganizerContact } from "@/lib/data";

interface ContactOrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: SpaceEvent;
}

const ContactOrganizerModal = ({ isOpen, onClose, event }: ContactOrganizerModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      message: "",
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add contact to organizer's contact list
      addOrganizerContact({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        eventId: event.id,
        organizerId: event.organizerId,
      });
      
      toast({
        title: "Message Sent!",
        description: `Your message has been sent to ${event.organizer?.name}`,
        duration: 5000,
      });
      
      resetForm();
      onClose();
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Organizer</DialogTitle>
          <DialogDescription>
            Send a message to {event.organizer?.name} about "{event.title}"
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="contactName">Your Name *</Label>
            <Input
              id="contactName"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="contactPhone">Phone Number *</Label>
            <Input
              id="contactPhone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="contactMessage">Message *</Label>
            <Textarea
              id="contactMessage"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Write your message to the organizer..."
              rows={4}
              required
            />
          </div>
          
          <DialogFooter className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactOrganizerModal;
