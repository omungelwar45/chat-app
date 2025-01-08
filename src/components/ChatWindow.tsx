import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Paperclip } from 'lucide-react';
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

  return (
    <div className="h-full flex">
      {/* Contacts Section */}
      <div className="w-1/4 bg-gray-100 border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <h2 className="text-lg font-bold">Contacts</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Mock contact list */}
          <div className="p-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer">
            <h3 className="text-sm font-semibold">John Doe</h3>
            <p className="text-xs text-gray-500">Hey! How are you?</p>
          </div>
          <div className="p-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer">
            <h3 className="text-sm font-semibold">Jane Smith</h3>
            <p className="text-xs text-gray-500">See you tomorrow!</p>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 flex flex-col bg-gray-50">
        {/* Header */}
        {chat ? (
          <div className="bg-white px-4 py-3 flex items-center justify-between shadow">
            <div className="flex items-center">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                {chat.online && (
                  <span className="text-xs text-gray-500">Online</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500 text-lg">Select a contact to start chatting</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {chat && (
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
                    className={`max-w-[75%] px-4 py-3 rounded-lg shadow-md ${
                      msg.sender === 'me'
                        ? 'bg-blue-100 text-gray-800'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <div className="text-right mt-1">
                      <span className="text-xs text-gray-400">
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
          )}
        </div>

        {/* Input */}
        {chat && (
          <div className="bg-gray-100 px-4 py-3 border-t border-gray-300">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
              <Smile className="w-6 h-6 text-gray-500 cursor-pointer" />
              <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer ml-2" />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message"
                className="flex-1 mx-4 bg-transparent outline-none text-gray-800 placeholder-gray-500"
              />
              <Send
                onClick={handleSend}
                className="w-6 h-6 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
