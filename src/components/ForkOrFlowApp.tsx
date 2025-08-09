import { useState } from 'react';
import { Layout } from './Layout';
import { OnboardingFlow } from './OnboardingFlow';
import { Navigation } from './Navigation';
import { HomeScreen } from './HomeScreen';
import { PeopleScreen } from './PeopleScreen';
import { EventsScreen } from './EventsScreen';
import { EventDetails } from './EventDetails';
import { MessagesScreen } from './MessagesScreen';

export const ForkOrFlowApp = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedEventId(null); // Reset event selection when changing tabs
  };

  const handleEventSelect = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleEventBack = () => {
    setSelectedEventId(null);
  };

  if (!isOnboarded) {
    return (
      <Layout>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative">
        {/* Main Content */}
        {selectedEventId ? (
          <EventDetails
            eventId={selectedEventId}
            onBack={handleEventBack}
            onNavigate={handleTabChange}
          />
        ) : (
          <>
            {activeTab === 'home' && <HomeScreen onNavigate={handleTabChange} />}
            {activeTab === 'people' && <PeopleScreen onNavigate={handleTabChange} />}
            {activeTab === 'events' && (
              <EventsScreen
                onNavigate={handleTabChange}
                onSelectEvent={handleEventSelect}
              />
            )}
            {activeTab === 'messages' && <MessagesScreen onNavigate={handleTabChange} />}
          </>
        )}

        {/* Bottom Navigation - Hidden when viewing event details */}
        {!selectedEventId && (
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </Layout>
  );
};