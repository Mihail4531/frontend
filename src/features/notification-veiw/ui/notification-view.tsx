import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react"; // 1. Берем иконку из lucide-react
import { notificationApi } from "@/entities/notification/api/notification.api";
import { Notification } from "@/entities/notification/model/types";
import { NotificationItem } from "@/entities/notification/ui/notification";

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Считаем количество непрочитанных (где read_at === null)
  const unreadCount = notifications.filter((n) => n.read_at === null).length;

  // 2. Исправляем useEffect, чтобы избежать ошибки "Cascading renders"
  useEffect(() => {
    let isMounted = true; // Флаг для предотвращения обновления стейта на размонтированном компоненте

    const fetchNotifications = async () => {
      try {
        const data = await notificationApi.getAll();
        // Проверяем, смонтирован ли компонент перед обновлением стейта
        if (isMounted) {
          setNotifications(data);
        }
      } catch (error) {
        console.error("Failed to load notifications", error);
      }
    };

    fetchNotifications();

    // Поллинг раз в 60 сек
    const interval = setInterval(fetchNotifications, 60000);

    // Функция очистки
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []); // <--- ВАЖНО: Пустой массив зависимостей. Если его убрать, будет бесконечный ререндер и ошибка.

  // Закрытие при клике снаружи
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Тоже пустой массив

  // Логика "Прочитать"
  const handleRead = async (notification: Notification) => {
    if (notification.read_at) return;

    try {
      // Оптимистичное обновление UI
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id
            ? { ...n, read_at: new Date().toISOString() }
            : n
        )
      );
      // Запрос на сервер
      await notificationApi.markAsRead(notification.id);
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Кнопка с иконкой Lucide */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-current hover:bg-zinc-800 rounded-full transition outline-none"
      >
        <Bell className="w-6 h-6" /> {/* Иконка Lucide */}
        
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute right-0 mb-2 bottom-full w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 flex justify-between items-center">
            <span>Уведомления</span>
            {unreadCount > 0 && (
                <span className="text-xs font-normal text-gray-500">
                    {unreadCount} новых
                </span>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                Нет новых уведомлений
              </div>
            ) : (
              notifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onClick={() => handleRead(item)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};