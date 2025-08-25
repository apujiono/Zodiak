const socket = io(process.env.BACKEND_URL || 'https://your-backend-service.up.railway.app');
const backendUrl = process.env.BACKEND_URL || 'https://your-backend-service.up.railway.app';

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const zodiac = document.getElementById('zodiac').value;
  fetch(`${backendUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, zodiac })
  }).then(res => res.json()).then(data => {
    document.getElementById('auth-message').innerText = data.msg;
  });
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch(`${backendUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    localStorage.setItem('token', data.token);
    document.getElementById('auth-message').innerText = 'Logged in!';
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    getProfile();
    getDailyQuest();
  });
}

function logout() {
  fetch(`${backendUrl}/logout`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()).then(data => {
    localStorage.removeItem('token');
    document.getElementById('auth-message').innerText = data.msg;
    document.getElementById('auth').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
  });
}

function getProfile() {
  fetch(`${backendUrl}/user/me`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()).then(data => {
    document.getElementById('user-username').innerText = data.username;
    document.getElementById('user-zodiac').innerText = data.zodiac;
    document.getElementById('cosmo-points').innerText = data.cosmo_points;
    document.getElementById('user-bio').innerText = data.bio;
  });
}

function updateProfile() {
  const username = prompt('New username');
  const password = prompt('New password');
  const zodiac = prompt('New zodiac');
  const bio = prompt('New bio');
  fetch(`${backendUrl}/user/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({ username, password, zodiac, bio })
  }).then(res => res.json()).then(data => alert(data.msg));
}

function deleteAccount() {
  if (confirm('Delete account?')) {
    fetch(`${backendUrl}/user/delete`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(res => res.json()).then(data => {
      alert(data.msg);
      logout();
    });
  }
}

function sendMessage() {
  const room = document.getElementById('room').value;
  const text = document.getElementById('message-input').value;
  socket.emit('message', { room, text });
  document.getElementById('message-input').value = '';
}

socket.on('message', (msg) => {
  const messages = document.getElementById('messages');
  messages.innerHTML += `<p>${msg}</p>`;
  messages.scrollTop = messages.scrollHeight;
});

function getDailyQuest() {
  fetch(`${backendUrl}/quest/daily`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()).then(data => {
    document.getElementById('quest-task').innerText = data.task;
  });
}

function startDuel() {
  const opponent = document.getElementById('opponent').value;
  fetch(`${backendUrl}/duel/start/${opponent}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()).then(data => {
    document.getElementById('duel-result').innerText = data.msg;
  });
}

function getStats() {
  fetch(`${backendUrl}/analytics/stats`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()).then(data => {
    document.getElementById('total-users').innerText = data.total_users;
    document.getElementById('total-messages').innerText = data.total_messages;
    const dist = document.getElementById('zodiac-dist');
    dist.innerHTML = '';
    for (let key in data.zodiac_distribution) {
      dist.innerHTML += `<p>${key}: ${data.zodiac_distribution[key]}</p>`;
    }
  }).catch(() => alert('Admins only'));
}