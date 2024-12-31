export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: Message;
  unreadCount: number;
  online: boolean;
  typing?: boolean;
}