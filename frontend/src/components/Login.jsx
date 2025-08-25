import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://your-backend-url/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg glow-effect">
        <h1 className="text-2xl mb-4 text-gold">Enter Sanctuary</h1>
        <input
          className="block mb-2 p-2 w-full bg-gray-700 rounded"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="block mb-2 p-2 w-full bg-gray-700 rounded"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 p-2 w-full rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
        <a href="/register" className="text-blue-300 text-sm mt-2 inline-block">Register</a>
      </div>
    </div>
  );
}

export default Login;