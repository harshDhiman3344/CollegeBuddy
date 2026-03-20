import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const syncUser = async (clerkId, username, email) => {
  try {
    const response = await api.post('/users/sync', {
      clerkId,
      username,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
};

export const getUser = async (clerkId) => {
  try {
    const response = await api.get(`/users/${clerkId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Item API
export const createItem = async (title, description, price, clerkId) => {
  try {
    const response = await api.post('/items', {
      title,
      description,
      price,
      clerkId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const fetchItems = async () => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

export const deleteItem = async (id, clerkId) => {
  try {
    const response = await api.delete(`/items/${id}`, {
      data: { clerkId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export default api;
