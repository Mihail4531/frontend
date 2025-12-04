export interface NotificationData {
  title: string;
  message: string;
  report_id?: number | null;
  status?: 'resolved' | 'rejected' | string | null; 
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