"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom"; // 1. Импортируем портал
import { Bell } from "lucide-react";
import { notificationApi } from "@/entities/notification/api/notification.api";
import { Notification } from "@/entities/notification/model/types";
import { NotificationItem } from "@/entities/notification/ui/notification";

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ left: 0, bottom: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => n.read_at === null).length;

  useEffect(() => {
    let isMounted = true;
    const fetchNotifications = async () => {
      try {
        const data = await notificationApi.getAll();
        if (isMounted) setNotifications(data);
      } catch (error) {
        console.error("Failed to load notifications", error);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const toggleOpen = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        left: rect.left, 
        bottom: window.innerHeight - rect.top + 12 
      });
    }
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDelete = async (id: string) => {
    try {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        await notificationApi.delete(id);
    } catch (error) {
        console.error("Failed to delete notification", error);
    }
  };

  const handleRead = async (notification: Notification) => {
    if (notification.read_at) return;
    try {
      setNotifications((prev) =>
        prev.map((n) => n.id === notification.id ? { ...n, read_at: new Date().toISOString() } : n)
      );
      await notificationApi.markAsRead(notification.id);
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  const dropdownContent = (
    <div
      ref={dropdownRef}
      style={{ 
        position: "fixed", 
        left: coords.left, 
        bottom: coords.bottom, 
        zIndex: 9999 
      }}
      className="w-80 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-black overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom-left"
    >
      <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 font-semibold text-white flex justify-between items-center">
        <span>Уведомления</span>
        {unreadCount > 0 && (
            <span className="text-xs font-medium text-white bg-indigo-600 px-2 py-0.5 rounded-md shadow-sm">
                {unreadCount} новых
            </span>
        )}
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-zinc-950">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-sm">
            Нет новых уведомлений
          </div>
        ) : (
          notifications.map((item) => (
            <NotificationItem
              key={item.id}
              notification={item}
              onClick={() => handleRead(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Кнопка остается на своем месте в Sidebar */}
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className={`relative p-2 rounded-full transition outline-none ${
           isOpen ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
        }`}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
            {unreadCount}
          </span>
        )}
      </button>

 
      {isOpen && typeof document !== "undefined" && createPortal(dropdownContent, document.body)}
    </>
  );
};