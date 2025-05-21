
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addEvent, addOrganizer } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const RegistrationModal = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("organization");
  const [loading, setLoading] = useState(false);
  
  // Organization form
  const [organizerData, setOrganizerData] = useState({
    name: "",
    type: "educational",
    email: "",
    phone: "",
    description: "",
    logoUrl: "",
    websiteUrl: "",
  });
  
  // Event form
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
  
  // Reset all form data
  const resetForms = () => {
    setOrganizerData({
      name: "",
      type: "educational",
      email: "",
      phone: "",
      description: "",
      logoUrl: "",
      websiteUrl: "",
    });
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
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add organization first
      const newOrganizer = addOrganizer({
        name: organizerData.name,
        type: organizerData.type as any,
        email: organizerData.email,
        phone: organizerData.phone,
        description: organizerData.description,
        logoUrl: organizerData.logoUrl,
        websiteUrl: organizerData.websiteUrl,
      });
      
      // Then add event if in event tab
      if (tab === "event") {
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
          organizerId: newOrganizer.id,
          cost: eventData.cost,
          targetAudience: eventData.targetAudience,
          capacity: eventData.capacity ? parseInt(eventData.capacity) : undefined,
        });
      }
      
      toast({
        title: "Success!",
        description: tab === "organization" 
          ? "Your organization has been registered" 
          : "Your event has been published",
        duration: 5000,
      });
      
      resetForms();
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Listen for custom event to open modal
  useState(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
    };
    
    window.addEventListener("open-registration-modal", handleOpenModal);
    
    return () => {
      window.removeEventListener("open-registration-modal", handleOpenModal);
    };
  });
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Register with Anga Connect</DialogTitle>
          <DialogDescription>
            Share your space events and services with the Kenyan community
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="organization" value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="organization">Organization Info</TabsTrigger>
            <TabsTrigger value="event">Event Details</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="organization" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="orgName">Organization/Individual Name *</Label>
                <Input
                  id="orgName"
                  value={organizerData.name}
                  onChange={(e) => setOrganizerData({...organizerData, name: e.target.value})}
                  placeholder="Your organization or full name"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="orgType">Type *</Label>
                <Select 
                  value={organizerData.type} 
                  onValueChange={(value) => setOrganizerData({...organizerData, type: value})}
                  required
                >
                  <SelectTrigger id="orgType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="educational">Educational Institution</SelectItem>
                    <SelectItem value="non-profit">Non-Profit Organization</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="private">Private Company</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="orgEmail">Email Address *</Label>
                <Input
                  id="orgEmail"
                  type="email"
                  value={organizerData.email}
                  onChange={(e) => setOrganizerData({...organizerData, email: e.target.value})}
                  placeholder="organization@example.com"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="orgPhone">Phone Number *</Label>
                <Input
                  id="orgPhone"
                  value={organizerData.phone}
                  onChange={(e) => setOrganizerData({...organizerData, phone: e.target.value})}
                  placeholder="+254 700 000000"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="orgDescription">Description *</Label>
                <Textarea
                  id="orgDescription"
                  value={organizerData.description}
                  onChange={(e) => setOrganizerData({...organizerData, description: e.target.value})}
                  placeholder="Tell us about your organization or yourself"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="orgLogo">Logo URL (optional)</Label>
                <Input
                  id="orgLogo"
                  value={organizerData.logoUrl}
                  onChange={(e) => setOrganizerData({...organizerData, logoUrl: e.target.value})}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="orgWebsite">Website URL (optional)</Label>
                <Input
                  id="orgWebsite"
                  value={organizerData.websiteUrl}
                  onChange={(e) => setOrganizerData({...organizerData, websiteUrl: e.target.value})}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => setTab("event")}
                  disabled={!organizerData.name || !organizerData.email || !organizerData.phone || !organizerData.description}
                >
                  Next: Event Details
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="event" className="space-y-4">
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
              
              <div className="flex justify-between pt-4">
                <Button type="button" onClick={() => setTab("organization")}>
                  Back
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
