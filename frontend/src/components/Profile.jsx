import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({ username: '', zodiac: '', bio: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://your-backend-url/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data)).catch(() => navigate('/login'));
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      await axios.put('http://your-backend-url/user/profile', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete account?')) {
      await axios.delete('http://your-backend-url/user/delete', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg glow-effect max-w-md mx-auto mt-10">
      <h2 className="text-xl text-gold">Edit Your Cloth</h2>
      <input
        className="block mb-2 p-2 w-full bg-gray-700 rounded"
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <input
        className="block mb-2 p-2 w-full bg-gray-700 rounded"
        value={user.bio}
        onChange={e => setUser({ ...user, bio: e.target.value })}
        placeholder="Bio"
      />
      <select
        className="block mb-2 p-2 w-full bg-gray-700 rounded"
        value={user.zodiac}
        onChange={e => setUser({ ...user, zodiac: e.target.value })}
      >
        <option value="Aries">Aries</option>
        <option value="Taurus">Taurus</option>
        <option value="Gemini">Gemini</option>
        <option value="Cancer">Cancer</option>
        <option value="Leo">Leo</option>
        <option value="Virgo">Virgo</option>
        <option value="Libra">Libra</option>
        <option value="Scorpio">Scorpio</option>
        <option value="Sagittarius">Sagittarius</option>
        <option value="Capricorn">Capricorn</option>
        <option value="Aquarius">Aquarius</option>
        <option value="Pisces">Pisces</option>
      </select>
      <button
        className="bg-blue-600 p-2 w-full rounded hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Save Cosmo
      </button>
      <button
        className="bg-red-600 p-2 w-full rounded mt-2 hover:bg-red-700"
        onClick={handleDelete}
      >
        Delete Account
      </button>
    </div>
  );
}

export default Profile;