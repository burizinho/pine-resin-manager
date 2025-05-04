
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64">
          <Header />
          <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </Router>
  );
}
