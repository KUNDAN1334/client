import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this to match your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
