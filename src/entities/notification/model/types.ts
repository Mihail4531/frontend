export interface NotificationData {
  title: string;
  message: string;
  // ? означает, что ключа может не быть
  // | null означает, что с бэкенда может прийти null
  reply?: string | null;     
  report_id?: number | null; 
  type?: string;
}

export interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}