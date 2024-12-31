import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import type { Chat, Message } from '../types/chat';

interface ChatWindowProps {
  chat?: Chat;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#efeae2]">
      <div className="bg-[#f0f2f5] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold">{chat.name}</h3>
            {chat.online && (
              <span className="text-xs text-gray-500">online</span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Video className="w-5 h-5 text-gray-600 cursor-pointer" />
          <Phone className="w-5 h-5 text-gray-600 cursor-pointer" />
          <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                msg.sender === 'me' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'me'
                    ? 'bg-[#dcf8c6] ml-auto'
                    : 'bg-white'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="flex items-center justify-end mt-1">
                  <span className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-[#f0f2f5] p-4">
        <div className="flex items-center bg-white rounded-lg px-4 py-2">
          <Smile className="w-6 h-6 text-gray-500 cursor-pointer" />
          <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer ml-2" />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message"
            className="flex-1 ml-4 outline-none"
          />
          <Send
            onClick={handleSend}
            className="w-6 h-6 text-gray-500 cursor-pointer ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;