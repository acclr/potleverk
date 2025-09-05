"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/utils";

/**
 * Basic shape of a Notification.
 */
export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

/**
 * Type for the notification context's value:
 * - The current list of notifications
 * - A function to add a notification
 * - A function to remove a notification
 */
interface NotificationContextValue {
  notifications: Notification[];
  notify: (type: Notification["type"], message: string) => void;
  remove: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function useNotify() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotify must be used within a NotificationProvider");
  }
  return {
    notify: ctx.notify,
    remove: ctx.remove
  };
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (type: Notification["type"], message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message
    };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after 3 seconds,' for example'
    setTimeout(() => {
      remove(newNotification.id);
    }, 3000);
  };

  const remove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        remove
      }}>
      {children}
      <div className="fixed bottom-6 left-1/2 z-100 -translate-x-1/2 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}>
              <NotificationItem notification={notification} remove={remove} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

/**
 * A simple component to display a single notification item.
 * You can style it by type (success, error, etc.).
 */
const NotificationItem: React.FC<{
  notification: Notification;
  remove: (id: string) => void;
}> = ({ notification, remove }) => {
  const colorMap: Record<Notification["type"], string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-primary-600"
  };

  return (
    <div className={cn("flex items-center rounded px-4 py-2 text-white shadow", colorMap[notification.type])} role="alert">
      <span className="flex-1">{notification.message}</span>
      <button className="ml-3 text-white" onClick={() => remove(notification.id)}>
        ✕
      </button>
    </div>
  );
};
