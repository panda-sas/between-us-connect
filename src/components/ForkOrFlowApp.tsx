import { useState } from 'react';
import { Layout } from './Layout';
import { OnboardingFlow } from './OnboardingFlow';
import { Navigation } from './Navigation';
import { HomeScreen } from './HomeScreen';
import { PeopleScreen } from './PeopleScreen';
import { FeedScreen } from './FeedScreen';
import { PostDetails } from './PostDetails';
import { MessagesScreen } from './MessagesScreen';

export const ForkOrFlowApp = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedPostId(null); // Reset post selection when changing tabs
  };

  const handlePostSelect = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handlePostBack = () => {
    setSelectedPostId(null);
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
        {selectedPostId ? (
          <PostDetails
            postId={selectedPostId}
            onBack={handlePostBack}
          />
        ) : (
          <>
            {activeTab === 'home' && <HomeScreen onNavigate={handleTabChange} />}
            {activeTab === 'people' && <PeopleScreen onNavigate={handleTabChange} />}
            {activeTab === 'feed' && (
              <FeedScreen
                onNavigate={handleTabChange}
                onSelectPost={handlePostSelect}
              />
            )}
            {activeTab === 'messages' && <MessagesScreen onNavigate={handleTabChange} />}
          </>
        )}

        {/* Bottom Navigation - Hidden when viewing post details */}
        {!selectedPostId && (
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </Layout>
  );
};