import Link from "next/link";
import { CheckCircle, XCircle, Info,  FileText, ExternalLink, Trash2 } from "lucide-react"; // Добавил Trash2
import { Notification } from "../model/types";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  onDelete: () => void; // Новый проп
}

export const NotificationItem = ({ notification, onClick, onDelete }: NotificationItemProps) => {
  const { data, read_at, created_at } = notification;
  const isUnread = read_at === null;
  const getStatusConfig = (status?: string | null) => {
      switch (status) {
        case 'resolved': return { icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, borderColor: 'border-emerald-500/50', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400', label: 'Решено' };
        case 'rejected': return { icon: <XCircle className="w-4 h-4 text-red-500" />, borderColor: 'border-red-500/50', bgColor: 'bg-red-500/10', textColor: 'text-red-400', label: 'Отклонено' };
        default: return { icon: <Info className="w-4 h-4 text-blue-500" />, borderColor: 'border-blue-500/50', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400', label: 'Инфо' };
      }
  };

  const statusConfig = getStatusConfig(data.status);

  return (
    <div
      onClick={onClick}
      className={`relative p-4 border-b border-zinc-800 cursor-pointer transition duration-200 group
        ${isUnread ? "bg-zinc-900" : "bg-black hover:bg-zinc-900/50"}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${data.status === 'resolved' ? 'bg-emerald-500' : (data.status === 'rejected' ? 'bg-red-500' : 'bg-transparent')}`} />

      <div className="flex justify-between items-start mb-1 pl-2">
        <div className="flex flex-col">
            <h4 className={`text-sm pr-2 ${isUnread ? "font-bold text-white" : "font-medium text-zinc-300"}`}>
            {data.title}
            </h4>
            <span className="text-xs text-zinc-500 whitespace-nowrap">
            {new Date(created_at).toLocaleDateString()}
            </span>
        </div>
        
  
        <button 
            onClick={(e) => {
                e.stopPropagation(); 
                onDelete();
            }}
            className="p-1.5 text-zinc-600 hover:text-red-500 hover:bg-zinc-800 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Удалить уведомление"
        >
            <Trash2 className="w-4 h-4" />
        </button>
      </div>
       {data.post_title && (
        <div className="pl-2 mb-2 mt-1">
          {data.post_slug ? (
            <Link 
                href={`/blog/${data.post_slug}`} 
                onClick={(e) => e.stopPropagation()} 
                className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800/50 w-fit hover:bg-zinc-800 hover:text-white transition-colors"
            >
                <FileText className="w-3 h-3 text-zinc-500" />
                <span className="truncate max-w-[180px]">
                    Пост: <span className="text-zinc-200">{data.post_title}</span>
                </span>
                <ExternalLink className="w-3 h-3 text-zinc-600 ml-1" />
            </Link>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/30 px-2 py-1 rounded border border-zinc-800/30 w-fit">
                <FileText className="w-3 h-3 text-zinc-600" />
                <span className="truncate max-w-[200px]">
                    Пост: {data.post_title}
                </span>
            </div>
          )}
        </div>
      )}

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