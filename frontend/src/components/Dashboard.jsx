import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    axios.get('http://your-backend-url/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data)).catch(() => navigate('/login'));
  }, [navigate]);

  const logout = async () => {
    await axios.get('http://your-backend-url/logout');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-4 flex">
      <div className="w-1/4 bg-gray-800 p-4 rounded-lg glow-effect">
        <h2 className="text-xl text-gold">Sanctuary Profile</h2>
        {user && (
          <>
            <p>Saint: {user.username}</p>
            <p>Zodiac: {user.zodiac}</p>
            <p>Cosmo Points: {user.cosmo_points}</p>
            <p>Bio: {user.bio || 'No bio'}</p>
            <button
              className="bg-blue-600 p-2 mt-2 rounded w-full hover:bg-blue-700"
              onClick={() => navigate('/profile')}
            >
              Edit Profile
            </button>
            <button
              className="bg-red-600 p-2 mt-2 rounded w-full hover:bg-red-700"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
        <h3 className="mt-4">Temples</h3>
        <ul>
          <li><a href="/chat/Aries" className="text-blue-300">Aries Temple</a></li>
          <li><a href="/chat/Leo" className="text-blue-300">Leo Temple</a></li>
          <li><a href="/analytics" className="text-blue-300">Analytics</a></li>
        </ul>
      </div>
      <div className="w-3/4 ml-4">
        <h1 className="text-2xl text-gold">Welcome to Sanctuary</h1>
        <div className="bg-gray-900 p-4 rounded mt-2 glow-effect">
          <h3>Daily Quest</h3>
          <p>Task: Chat with 3 Saints (+10 Cosmo Points)</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;