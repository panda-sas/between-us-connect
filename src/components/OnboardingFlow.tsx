import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Heart, Calendar } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const uncertaintyStages = [
  { id: 'leaning-yes', label: 'Leaning Yes', emoji: '✨' },
  { id: 'undecided', label: 'Undecided', emoji: '🤔' },
  { id: 'leaning-no', label: 'Leaning No', emoji: '🌱' }
];

const interests = [
  'Travel', 'Fitness', 'Books', 'Cooking', 'Movies', 'Music', 
  'Art', 'Nature', 'Photography', 'Gaming', 'Yoga', 'Coffee'
];

const relationshipStatus = [
  { id: 'single', label: 'Single', icon: Heart },
  { id: 'dating', label: 'Dating', icon: Heart },
  { id: 'partnered', label: 'Partnered', icon: Heart },
  { id: 'married', label: 'Married', icon: Heart }
];

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    relationship: '',
    uncertaintyStage: '',
    interests: [] as string[]
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-warm p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-warm animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-foreground">
            {step === 1 && "Welcome to Fork or Flow"}
            {step === 2 && "About You"}
            {step === 3 && "Your Journey"}
            {step === 4 && "Your Interests"}
          </CardTitle>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your first name"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Your age"
                  type="number"
                  className="rounded-xl"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label>Relationship Status</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {relationshipStatus.map((status) => (
                    <Button
                      key={status.id}
                      variant={formData.relationship === status.id ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, relationship: status.id }))}
                      className="justify-start gap-2 rounded-xl"
                    >
                      <status.icon className="w-4 h-4" />
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Where are you in your journey?</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  This helps us connect you with others in similar stages.
                </p>
                <div className="space-y-2">
                  {uncertaintyStages.map((stage) => (
                    <Button
                      key={stage.id}
                      variant={formData.uncertaintyStage === stage.id ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, uncertaintyStage: stage.id }))}
                      className="w-full justify-start gap-3 rounded-xl h-auto p-4"
                    >
                      <span className="text-lg">{stage.emoji}</span>
                      <span>{stage.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label>What are you interested in?</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select activities and interests to help find your community.
                </p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      onClick={() => toggleInterest(interest)}
                      className="cursor-pointer rounded-full px-3 py-1 transition-colors"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && (!formData.name || !formData.age)) ||
              (step === 2 && (!formData.location || !formData.relationship)) ||
              (step === 3 && !formData.uncertaintyStage) ||
              (step === 4 && formData.interests.length === 0)
            }
            className="w-full rounded-xl"
          >
            {step === 4 ? 'Complete Setup' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};