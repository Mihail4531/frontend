import Link from "next/link";
import { Notification } from "../model/types";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const { data, read_at, created_at } = notification;
  const isUnread = read_at === null;

  return (
    <div
      onClick={onClick}
      // Общие стили контейнера
      className={`p-4 border-b border-zinc-800 cursor-pointer transition duration-200 
        ${isUnread 
          ? "bg-zinc-900" // Непрочитанное: чуть светлее фона
          : "bg-black hover:bg-zinc-900/50" // Прочитанное: черный фон, при наведении подсветка
        }`}
    >
      {/* Шапка: Заголовок и Дата */}
      <div className="flex justify-between items-start mb-1 gap-2">
        <h4 className={`text-sm ${isUnread ? "font-bold text-white" : "font-medium text-zinc-300"}`}>
          {data.title}
        </h4>
        <span className="text-xs text-zinc-500 whitespace-nowrap">
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Текст сообщения */}
      <p className="text-sm text-zinc-400 mb-3 leading-relaxed">
        {data.message}
      </p>

      {/* Ответ администратора */}
      {data.reply && (
        <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 text-xs text-zinc-300 italic mb-2">
          <span className="text-indigo-400 font-semibold not-italic">Админ: </span> 
         {data.reply}{'"'}
        </div>
      )}

   
      
    </div>
  );
};


