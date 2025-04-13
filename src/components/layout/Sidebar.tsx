
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Home, 
  BarChart3, 
  DollarSign, 
  Droplet, 
  Settings, 
  Menu, 
  X,
  UserCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted text-foreground/80 hover:text-foreground"
      )}
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-forest-700">
              Gestor de Resina
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <NavItem
              to="/"
              icon={<Home />}
              label="Dashboard"
              isActive={location.pathname === '/'}
              onClick={closeSidebar}
            />
            <NavItem
              to="/areas"
              icon={<MapPin />}
              label="Áreas de Plantio"
              isActive={location.pathname.startsWith('/areas')}
              onClick={closeSidebar}
            />
            <NavItem
              to="/extractions"
              icon={<Droplet />}
              label="Extrações"
              isActive={location.pathname.startsWith('/extractions')}
              onClick={closeSidebar}
            />
            <NavItem
              to="/finances"
              icon={<DollarSign />}
              label="Finanças"
              isActive={location.pathname.startsWith('/finances')}
              onClick={closeSidebar}
            />
            <NavItem
              to="/reports"
              icon={<BarChart3 />}
              label="Relatórios"
              isActive={location.pathname.startsWith('/reports')}
              onClick={closeSidebar}
            />
            <NavItem
              to="/settings"
              icon={<Settings />}
              label="Configurações"
              isActive={location.pathname.startsWith('/settings')}
              onClick={closeSidebar}
            />
          </nav>

          {/* User section */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle className="h-8 w-8 text-forest-600" />
                <div>
                  <p className="font-medium text-sm">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@exemplo.com</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
