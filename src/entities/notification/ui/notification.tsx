
import { CheckCircle, XCircle, Info } from "lucide-react"; 
import { Notification } from "../model/types";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const { data, read_at, created_at } = notification;
  const isUnread = read_at === null;
  const getStatusConfig = (status?: string | null) => {
    switch (status) {
      case 'resolved':
        return {
          icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
          borderColor: 'border-emerald-500/50',
          bgColor: 'bg-emerald-500/10',
          textColor: 'text-emerald-400',
          label: 'Решено'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          borderColor: 'border-red-500/50',
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-400',
          label: 'Отклонено'
        };
      default:
        return {
          icon: <Info className="w-4 h-4 text-blue-500" />,
          borderColor: 'border-blue-500/50',
          bgColor: 'bg-blue-500/10',
          textColor: 'text-blue-400',
          label: 'Инфо'
        };
    }
  };
  const statusConfig = getStatusConfig(data.status);
  return (
    <div
      onClick={onClick}
      className={`relative p-4 border-b border-zinc-800 cursor-pointer transition duration-200 group
        ${isUnread 
            ? "bg-zinc-900" 
            : "bg-black hover:bg-zinc-900/50"
        }`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${data.status === 'resolved' ? 'bg-emerald-500' : (data.status === 'rejected' ? 'bg-red-500' : 'bg-transparent')}`} />
      <div className="flex justify-between items-start mb-2 pl-2">
        <h4 className={`text-sm pr-2 ${isUnread ? "font-bold text-white" : "font-medium text-zinc-300"}`}>
          {data.title}
        </h4>
        <span className="text-xs text-zinc-500 whitespace-nowrap">
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-zinc-400 mb-3 pl-2 leading-relaxed">
        {data.message}
      </p>
      {data.status && (
        <div className="pl-2 mb-2">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${statusConfig.borderColor} ${statusConfig.bgColor}`}>
            {statusConfig.icon}
            <span className={`text-xs font-medium ${statusConfig.textColor}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>
      )}    
  </div>
  );
};