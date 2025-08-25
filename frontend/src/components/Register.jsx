import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getZodiac } from '../utils/zodiac';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const zodiac = getZodiac(birthDate);
      await axios.post('http://your-backend-url/register', { username, password, zodiac });
      alert('Registered! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg glow-effect">
        <h1 className="text-2xl mb-4 text-gold">Join Sanctuary</h1>
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
        <input
          type="date"
          className="block mb-2 p-2 w-full bg-gray-700 rounded"
          onChange={e => setBirthDate(e.target.value)}
        />
        <button
          className="bg-blue-600 p-2 w-full rounded hover:bg-blue-700"
          onClick={handleRegister}
        >
          Register
        </button>
        <a href="/login" className="text-blue-300 text-sm mt-2 inline-block">Login</a>
      </div>
    </div>
  );
}

export default Register;