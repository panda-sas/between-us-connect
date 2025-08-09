import { Home, Users, Calendar, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'people', label: 'People', icon: Users },
  { id: 'feed', label: 'Feed', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageCircle }
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                  isActive 
                    ? "text-primary bg-primary-light" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "animate-pulse-soft")} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};