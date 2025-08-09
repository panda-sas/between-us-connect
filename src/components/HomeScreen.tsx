import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MapPin, MessageCircle, Plus } from 'lucide-react';
import heroImage from '@/assets/hero-community.jpg';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

export const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="pb-20 bg-gradient-subtle min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-b-3xl">
        <img 
          src={heroImage} 
          alt="Community gathering"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-1">Welcome back!</h1>
          <p className="text-white/90">Find your people, build connections</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => onNavigate('people')}
              className="h-auto p-4 flex-col gap-2 rounded-xl"
            >
              <Users className="w-6 h-6 text-primary" />
              <span className="text-sm">Find People</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('feed')}
              className="h-auto p-4 flex-col gap-2 rounded-xl"
            >
              <Calendar className="w-6 h-6 text-secondary" />
              <span className="text-sm">Browse Feed</span>
            </Button>
          </CardContent>
        </Card>

        {/* Your Community Stats */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Your Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">12 nearby connections</p>
                  <p className="text-sm text-muted-foreground">In your area</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('people')}>
                View
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">5 new posts</p>
                  <p className="text-sm text-muted-foreground">In your feed</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('feed')}>
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm"><span className="font-medium">Sarah</span> joined Coffee & Conversation</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm">New post: <span className="font-medium">"Anyone else feeling overwhelmed?"</span></p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm"><span className="font-medium">Mike</span> sent you a message</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Badge */}
        <Card className="shadow-soft bg-gradient-warm">
          <CardContent className="p-4 text-center">
            <div className="mb-3">
              <span className="text-2xl">🤔</span>
            </div>
            <h3 className="font-semibold mb-1">Your Journey: Undecided</h3>
            <p className="text-sm text-foreground/80 mb-3">
              Connect with others exploring the same questions
            </p>
            <Badge variant="secondary" className="rounded-full">
              <MapPin className="w-3 h-3 mr-1" />
              San Francisco
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};