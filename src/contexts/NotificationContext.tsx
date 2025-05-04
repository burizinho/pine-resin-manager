
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";
import { Bell, Info, AlertTriangle } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  // Load notifications from localStorage on initial render
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      try {
        const parsedData = JSON.parse(storedNotifications);
        // Convert string dates back to Date objects
        const notificationsWithDateObjects = parsedData.map((notif: any) => ({
          ...notif,
          timestamp: new Date(notif.timestamp)
        }));
        setNotifications(notificationsWithDateObjects);
      } catch (error) {
        console.error('Failed to parse notifications from localStorage', error);
      }
    }
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      timestamp: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Show a toast for the new notification
    const icon = notification.type === 'warning' ? AlertTriangle : 
                 notification.type === 'info' ? Info : Bell;
                 
    toast(notification.title, {
      description: notification.message,
      icon: React.createElement(icon, { className: "h-4 w-4" }),
      className: notification.type === 'error' ? 'bg-destructive' :
                notification.type === 'warning' ? 'border-amber-500' :
                notification.type === 'success' ? 'border-green-600' : ''
    });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
