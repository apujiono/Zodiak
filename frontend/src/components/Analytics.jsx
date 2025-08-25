import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Analytics() {
  const [stats, setStats] = useState({ total_users: 0, total_messages: 0, zodiac_distribution: {} });

  useEffect(() => {
    axios.get('http://your-backend-url/analytics/stats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setStats(res.data)).catch(() => alert('Access denied'));
  }, []);

  const chartData = {
    labels: Object.keys(stats.zodiac_distribution),
    datasets: [{
      label: 'Users per Zodiac',
      data: Object.values(stats.zodiac_distribution),
      backgroundColor: 'rgba(255, 215, 0, 0.5)',
    }]
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg glow-effect max-w-4xl mx-auto mt-10">
      <h2 className="text-xl text-gold">Sanctuary Analytics</h2>
      <p>Total Users: {stats.total_users}</p>
      <p>Total Messages: {stats.total_messages}</p>
      <div className="mt-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default Analytics;