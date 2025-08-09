import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Share, Heart } from 'lucide-react';
import eventsImage from '@/assets/events-activities.jpg';

const mockEvent = {
  id: 1,
  title: 'Coffee & Conversation',
  date: 'Saturday, Mar 16',
  time: '10:00 AM - 12:00 PM',
  location: 'Blue Bottle Coffee, Mission District',
  address: '66 Mint St, San Francisco, CA 94103',
  distance: '1.2 miles',
  attendees: 12,
  maxAttendees: 15,
  category: 'Social',
  description: 'Join us for a relaxed coffee meetup where we can share thoughts, experiences, and support each other through life\'s big decisions. This is a judgment-free space for anyone exploring their path forward.',
  hostName: 'Sarah Chen',
  hostAge: 32,
  hostStage: 'Leaning Yes',
  hostEmoji: '✨',
  isAttending: false,
  attendeesList: [
    { name: 'Marcus J.', emoji: '🤔', initials: 'MJ' },
    { name: 'Elena R.', emoji: '🌱', initials: 'ER' },
    { name: 'David K.', emoji: '🤔', initials: 'DK' },
    { name: 'Lisa M.', emoji: '✨', initials: 'LM' },
    { name: 'Alex T.', emoji: '🤔', initials: 'AT' }
  ]
};

interface EventDetailsProps {
  eventId: number;
  onBack: () => void;
  onNavigate: (tab: string) => void;
}

export const EventDetails = ({ eventId, onBack, onNavigate }: EventDetailsProps) => {
  const [isAttending, setIsAttending] = useState(mockEvent.isAttending);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleRSVP = () => {
    setIsAttending(!isAttending);
  };

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header with image */}
      <div className="relative">
        <img 
          src={eventsImage} 
          alt="Event preview"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorited(!isFavorited)}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current text-red-400' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
          >
            <Share className="w-5 h-5" />
          </Button>
        </div>

        {/* Event title overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary text-primary-foreground rounded-full">
              {mockEvent.category}
            </Badge>
            {isAttending && (
              <Badge className="bg-secondary text-secondary-foreground rounded-full">
                Going
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold">{mockEvent.title}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Event Info */}
        <Card className="shadow-soft">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{mockEvent.date}</p>
                <p className="text-sm text-muted-foreground">{mockEvent.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{mockEvent.location}</p>
                <p className="text-sm text-muted-foreground">{mockEvent.address}</p>
                <p className="text-sm text-muted-foreground">{mockEvent.distance} away</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{mockEvent.attendees}/{mockEvent.maxAttendees} attending</p>
                <p className="text-sm text-muted-foreground">
                  {mockEvent.maxAttendees - mockEvent.attendees} spots remaining
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>About This Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {mockEvent.description}
            </p>
          </CardContent>
        </Card>

        {/* Host Info */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Hosted by</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center text-xl">
                {mockEvent.hostEmoji}
              </div>
              <div className="flex-1">
                <p className="font-medium">{mockEvent.hostName}, {mockEvent.hostAge}</p>
                <Badge variant="outline" className="rounded-full text-xs">
                  {mockEvent.hostStage}
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendees */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Who's Going</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {mockEvent.attendeesList.map((attendee, index) => (
                <div key={index} className="text-center">
                  <Avatar className="w-10 h-10 mx-auto mb-1">
                    <AvatarFallback className="bg-gradient-warm text-sm">
                      {attendee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-muted-foreground truncate">
                    {attendee.name}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-xl">
              View All Attendees
            </Button>
          </CardContent>
        </Card>

        {/* RSVP Button */}
        <div className="sticky bottom-24 bg-background/80 backdrop-blur-sm p-4 -m-4 border-t border-border">
          <Button
            onClick={handleRSVP}
            className={`w-full rounded-xl h-12 font-semibold ${
              isAttending 
                ? 'bg-secondary hover:bg-secondary/90' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isAttending ? 'Cancel RSVP' : 'Join This Event'}
          </Button>
        </div>
      </div>
    </div>
  );
};