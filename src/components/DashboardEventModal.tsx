
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addEvent } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { EventOrganizer } from "@/lib/types";

interface DashboardEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizer: EventOrganizer;
}

const DashboardEventModal = ({ isOpen, onClose, organizer }: DashboardEventModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    type: "workshop",
    imageUrl: "",
    location: "",
    date: "",
    time: "",
    endDate: "",
    endTime: "",
    cost: "",
    targetAudience: "",
    capacity: "",
  });
  
  const resetForm = () => {
    setEventData({
      title: "",
      description: "",
      type: "workshop",
      imageUrl: "",
      location: "",
      date: "",
      time: "",
      endDate: "",
      endTime: "",
      cost: "",
      targetAudience: "",
      capacity: "",
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Combine date and time strings to create proper date objects
      const dateString = `${eventData.date}T${eventData.time || "00:00"}`;
      const dateObj = new Date(dateString);
      
      // End date is optional
      let endDateObj = undefined;
      if (eventData.endDate) {
        const endDateString = `${eventData.endDate}T${eventData.endTime || "00:00"}`;
        endDateObj = new Date(endDateString);
      }
      
      addEvent({
        title: eventData.title,
        description: eventData.description,
        type: eventData.type as any,
        imageUrl: eventData.imageUrl,
        location: eventData.location,
        date: dateObj,
        endDate: endDateObj,
        organizerId: organizer.id,
        cost: eventData.cost,
        targetAudience: eventData.targetAudience,
        capacity: eventData.capacity ? parseInt(eventData.capacity) : undefined,
      });
      
      toast({
        title: "Success!",
        description: "Your event has been created successfully",
        duration: 5000,
      });
      
      resetForm();
      onClose();
      
      // Refresh the page to show the new event
      window.location.reload();
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Event</DialogTitle>
          <DialogDescription>
            Add a new space event for {organizer.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="eventTitle">Event Title *</Label>
            <Input
              id="eventTitle"
              value={eventData.title}
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
              placeholder="Name of your event"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="eventType">Event Type *</Label>
            <Select 
              value={eventData.type} 
              onValueChange={(value) => setEventData({...eventData, type: value})}
              required
            >
              <SelectTrigger id="eventType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="exhibition">Exhibition</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="eventDescription">Description *</Label>
            <Textarea
              id="eventDescription"
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              placeholder="Tell us about your event"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({...eventData, date: e.target.value})}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="eventTime">Start Time *</Label>
              <Input
                id="eventTime"
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({...eventData, time: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="eventEndDate">End Date (optional)</Label>
              <Input
                id="eventEndDate"
                type="date"
                value={eventData.endDate}
                onChange={(e) => setEventData({...eventData, endDate: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="eventEndTime">End Time (optional)</Label>
              <Input
                id="eventEndTime"
                type="time"
                value={eventData.endTime}
                onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="eventLocation">Location *</Label>
            <Input
              id="eventLocation"
              value={eventData.location}
              onChange={(e) => setEventData({...eventData, location: e.target.value})}
              placeholder="Physical location or 'Online'"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="eventImage">Image URL (optional)</Label>
            <Input
              id="eventImage"
              value={eventData.imageUrl}
              onChange={(e) => setEventData({...eventData, imageUrl: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="eventCost">Cost (optional)</Label>
              <Input
                id="eventCost"
                value={eventData.cost}
                onChange={(e) => setEventData({...eventData, cost: e.target.value})}
                placeholder="KES 1000 or 'Free'"
              />
            </div>
            
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="eventAudience">Target Audience (optional)</Label>
              <Input
                id="eventAudience"
                value={eventData.targetAudience}
                onChange={(e) => setEventData({...eventData, targetAudience: e.target.value})}
                placeholder="e.g. Children 8-12, University students, etc."
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="eventCapacity">Capacity (optional)</Label>
            <Input
              id="eventCapacity"
              type="number"
              min="1"
              value={eventData.capacity}
              onChange={(e) => setEventData({...eventData, capacity: e.target.value})}
              placeholder="Maximum number of attendees"
            />
          </div>
          
          <DialogFooter className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardEventModal;
