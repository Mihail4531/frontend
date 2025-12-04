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
      className={`p-4 border-b border-gray-100 cursor-pointer transition hover:bg-gray-50 ${
        isUnread ? "bg-blue-50" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className={`text-sm ${isUnread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
          {data.title}
        </h4>
        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Сообщение */}
      <p className="text-sm text-gray-600 mb-2">{data.message}</p>

      {/* Ответ администратора (если есть) */}
      {data.reply && (
        <div className="bg-white p-2 rounded border border-gray-200 text-xs text-gray-500 italic mb-2">
          {'Админ: "'}{data.reply}{'"'}
        </div>
      )}

      {/* Ссылка на жалобу (если есть) */}
      {data.report_id && (
        <div className="mt-1">
          <Link
            href={`/profile/reports/${data.report_id}`}
            className="text-xs text-blue-600 hover:underline font-medium"
            onClick={(e) => e.stopPropagation()} // Чтобы клик по ссылке не вызывал onClick карточки дважды
          >
            Посмотреть детали →
          </Link>
        </div>
      )}
    </div>
  );
};