import React, { useState } from 'react';
import { MessageSquare, Users, Phone, Settings } from 'lucide-react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import type { Chat, Message } from './types/chat';

const initialChats: Chat[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: {
      id: 'm1',
      content: 'Hey, how are you?',
      sender: 'them',
      timestamp: new Date(),
      status: 'read'
    },
    unreadCount: 0,
    online: true,
    typing: false
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: {
      id: 'm2',
      content: 'See you tomorrow!',
      sender: 'me',
      timestamp: new Date(),
      status: 'delivered'
    },
    unreadCount: 2,
    online: false
  }
];

const initialMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      content: 'Hey, how are you?',
      sender: 'them',
      timestamp: new Date(),
      status: 'read'
    }
  ],
  '2': [
    {
      id: 'm2',
      content: 'See you tomorrow!',
      sender: 'me',
      timestamp: new Date(),
      status: 'delivered'
    }
  ]
};

function App() {
  const [selectedChat, setSelectedChat] = useState<string>();
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'me',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    setChats(prev =>
      prev.map(chat =>
        chat.id === selectedChat
          ? { ...chat, lastMessage: newMessage }
          : chat
      )
    );
  };

  return (
    <div className="h-screen flex bg-[#f0f2f5]">
      <div className="w-20 bg-white border-r flex flex-col items-center py-6">
        <div className="space-y-8">
          <MessageSquare className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Users className="w-6 h-6 text-gray-400 cursor-pointer" />
          <Phone className="w-6 h-6 text-gray-400 cursor-pointer" />
          <Settings className="w-6 h-6 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div className="w-96 border-r">
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
      </div>
      <div className="flex-1">
        <ChatWindow
          chat={chats.find(c => c.id === selectedChat)}
          messages={messages[selectedChat || ''] || []}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default App;