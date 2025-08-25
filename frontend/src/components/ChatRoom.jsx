import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io(process.env.BACKEND_URL || 'https://your-backend-service.up.railway.app');

function ChatRoom() {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem(`chat_${room}`);
    if (cached) setMessages(JSON.parse(cached));
    socket.emit('join', room);
    socket.on('message', (msg) => {
      setMessages(prev => {
        const newMessages = [...prev, msg];
        localStorage.setItem(`chat_${room}`, JSON.stringify(newMessages.slice(-50)));
        return newMessages;
      });
    });
    return () => socket.off('message');
  }, [room]);

  const sendMessage = () => {
    socket.emit('message', { room, text: input });
    setInput('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl mb-2 text-gold">Chat in {room} Temple</h1>
      <div className="h-64 overflow-y-scroll bg-gray-900 p-2 rounded glow-effect">
        {messages.map((msg, i) => (
          <p key={i} className="animate-fade-in">{msg}</p>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          className="p-2 w-3/4 bg-gray-700 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 p-2 ml-2 rounded hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send Cosmo
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;