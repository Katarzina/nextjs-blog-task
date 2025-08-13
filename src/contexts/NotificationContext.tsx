'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type NotificationType = 'error' | 'success';

interface NotificationContextType {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 5000);
  }, []);

  const showError = useCallback((message: string) => {
    showNotification(message, 'error');
  }, [showNotification]);

  const showSuccess = useCallback((message: string) => {
    showNotification(message, 'success');
  }, [showNotification]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
    }
  };

  return (
    <NotificationContext.Provider value={{ showError, showSuccess, showNotification }}>
      {children}
      <div className="fixed top-20 right-4 z-50 space-y-2" role="region" aria-live="polite" aria-label="Oznámení">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`${getNotificationStyles(notification.type)} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in`}
            role="alert"
          >
            <div className="flex items-center justify-between gap-4">
              <p>{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/20 rounded"
                aria-label="Zavřít"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}