import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-background font-sans ${className}`}>
      <div className="mx-auto max-w-md bg-card shadow-soft">
        {children}
      </div>
    </div>
  );
};