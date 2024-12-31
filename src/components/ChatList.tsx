import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import type { Chat } from '../types/chat';

interface ChatListProps {
  chats: Chat[];
  selectedChat?: string;
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="h-full overflow-y-auto bg-white">
      {chats.map((chat) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelectChat(chat.id)}
          className={`flex items-center p-4 cursor-pointer border-b border-gray-100 ${
            selectedChat === chat.id ? 'bg-gray-50' : ''
          }`}
        >
          <div className="relative">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {chat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">{chat.name}</h3>
              {chat.lastMessage && (
                <span className="text-xs text-gray-500">
                  {format(chat.lastMessage.timestamp, 'HH:mm')}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 truncate max-w-[200px]">
                {chat.typing ? (
                  <span className="text-green-500">typing...</span>
                ) : (
                  chat.lastMessage?.content
                )}
              </p>
              <div className="flex items-center">
                {chat.lastMessage?.status === 'delivered' && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
                {chat.lastMessage?.status === 'read' && (
                  <CheckCheck className="w-4 h-4 text-blue-500" />
                )}
                {chat.unreadCount > 0 && (
                  <span className="ml-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatList;