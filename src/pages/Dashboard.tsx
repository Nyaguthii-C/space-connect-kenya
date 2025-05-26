
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MessageModal from "@/components/MessageModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addContact, addEvent, organizers } from "@/lib/data";
import { format } from "date-fns";
import { Contact } from "@/lib/types";
import { Send } from "lucide-react";

// Mocking as if we're logged in as the first organizer for demo purposes
const loggedInOrganizer = organizers[0];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [isBulkMessage, setIsBulkMessage] = useState(false);
  const { events, contacts } = loggedInOrganizer;

  const handleAddEvent = () => {
    window.dispatchEvent(new CustomEvent("open-registration-modal"));
  };

  const handleSendIndividualMessage = (contact: Contact) => {
    setSelectedContact(contact);
    setIsBulkMessage(false);
    setIsMessageModalOpen(true);
  };

  const handleSendBulkMessage = () => {
    setSelectedContact(undefined);
    setIsBulkMessage(true);
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedContact(undefined);
    setIsBulkMessage(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Organizer Portal</h1>
          <p className="text-muted-foreground">
            Manage your space events and contacts with Space Events Kenya
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{events.length}</CardTitle>
              <CardDescription>Active Events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {events.length > 0 ? `Last updated ${format(new Date(events[0].createdAt), "MMM d, yyyy")}` : "No events yet"}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{contacts.length}</CardTitle>
              <CardDescription>Total Contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {contacts.length > 0 ? `${contacts.length} people interested in your events` : "No contacts yet"}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/10 border-primary/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Add New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={handleAddEvent}
              >
                Create Event
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
                <CardDescription>
                  Manage your space events and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {events.length > 0 ? (
                  <Table>
                    <TableCaption>A list of your events</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Contacts</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(event.date), "MMM d, yyyy")}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.contacts.length}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't added any events yet</p>
                    <Button onClick={handleAddEvent}>Add Your First Event</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Contacts</CardTitle>
                    <CardDescription>
                      People who have registered interest in your events
                    </CardDescription>
                  </div>
                  {contacts.length > 0 && (
                    <Button onClick={handleSendBulkMessage} className="flex items-center gap-2">
                      <Send size={16} />
                      Send Bulk Message
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {contacts.length > 0 ? (
                  <Table>
                    <TableCaption>A list of contacts interested in your events</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => {
                        const contactEvent = events.find(e => e.id === contact.eventId);
                        return (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">{contact.name}</TableCell>
                            <TableCell>{contactEvent?.title || "Unknown Event"}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.email || "—"}</TableCell>
                            <TableCell>{format(new Date(contact.createdAt), "MMM d, yyyy")}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSendIndividualMessage(contact)}
                                className="flex items-center gap-1"
                              >
                                <Send size={12} />
                                Message
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No contacts yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Organization Profile</CardTitle>
                <CardDescription>
                  Manage your organization details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                    <p>{loggedInOrganizer.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Type</h3>
                    <p className="capitalize">{loggedInOrganizer.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p>{loggedInOrganizer.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                    <p>{loggedInOrganizer.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                  <p>{loggedInOrganizer.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Website</h3>
                    <p>{loggedInOrganizer.websiteUrl || "—"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Logo URL</h3>
                    <p className="truncate">{loggedInOrganizer.logoUrl || "—"}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Update Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        contact={selectedContact}
        contacts={isBulkMessage ? contacts : undefined}
        isBulk={isBulkMessage}
      />
    </div>
  );
};

export default Dashboard;
