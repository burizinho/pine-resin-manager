
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const typeColorMap = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const NotificationItem = ({ notification, onRead }: { notification: Notification, onRead: () => void }) => {
  return (
    <DropdownMenuItem 
      className={cn(
        "flex flex-col items-start p-3 space-y-1 cursor-pointer",
        !notification.read && "bg-muted/60"
      )}
      onClick={(e) => {
        e.preventDefault();
        onRead();
      }}
    >
      <div className="flex items-center justify-between w-full">
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          typeColorMap[notification.type]
        )}>
          {notification.type.toUpperCase()}
        </span>
        <span className="text-xs text-muted-foreground">
          {format(notification.timestamp, 'dd/MM/yy HH:mm', {locale: ptBR})}
        </span>
      </div>
      <div className="w-full">
        <h4 className="text-sm font-medium">{notification.title}</h4>
        <p className="text-xs text-muted-foreground">{notification.message}</p>
      </div>
    </DropdownMenuItem>
  );
};

export default function NotificationMenu() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive">
              {unreadCount > 9 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notificações</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">{unreadCount} não lidas</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onRead={() => markAsRead(notification.id)} 
                />
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                Não há notificações
              </div>
            )}
          </DropdownMenuGroup>
        </ScrollArea>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2 flex gap-2 justify-between">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Marcar todas como lidas
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs" 
                onClick={clearNotifications}
              >
                Limpar todas
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
