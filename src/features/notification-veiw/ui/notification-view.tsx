import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react"; // 1. Берем иконку из lucide-react
import { notificationApi } from "@/entities/notification/api/notification.api";
import { Notification } from "@/entities/notification/model/types";
import { NotificationItem } from "@/entities/notification/ui/notification";

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 const handleDelete = async (id: string) => {
    try {
        // Оптимистичное удаление: сразу убираем из списка на экране
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        
        // Отправляем запрос на сервер
        await notificationApi.delete(id);
    } catch (error) {
        console.error("Failed to delete notification", error);
        // В идеале тут можно вернуть уведомление обратно в список, если ошибка
    }
  };
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
      {/* Кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute left-0 mb-4 bottom-full 
            w-80 sm:w-96 
            bg-[#09090b]                 
            border border-zinc-800 
            rounded-xl 
            shadow-2xl shadow-black 
            z-[9999]                     
            overflow-hidden 
            origin-bottom-left">
          
          {/* Заголовок */}
          <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-700/50 font-semibold text-white flex justify-between items-center">
            <span>Уведомления</span>
            {unreadCount > 0 && (
                <span className="text-xs font-medium text-white bg-red-900 px-2 py-0.5 rounded-md shadow-sm">
                    {unreadCount} новых
                </span>
            )}
          </div>

          {/* Список */}
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-[#09090b]">
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
      )}
    </div>
  );
};