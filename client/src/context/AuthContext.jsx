import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE = 'http://localhost:5001/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage or auto-login the default test user
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('flipkart_user');
      const savedToken = localStorage.getItem('flipkart_token');
      
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setLoading(false);
      } else {
        // REQUIREMENT: "Assume a default user is logged in"
        // Request a real signed JWT from the backend for the Test User
        try {
          const response = await axios.get(`${API_BASE}/auto-login`);
          const { user, token } = response.data;
          
          localStorage.setItem('flipkart_user', JSON.stringify(user));
          localStorage.setItem('flipkart_token', token);
          setUser(user);
        } catch (error) {
          console.error('Auto-login failed:', error);
        }
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('flipkart_user', JSON.stringify(user));
      localStorage.setItem('flipkart_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/register`, { name, email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('flipkart_user', JSON.stringify(user));
      localStorage.setItem('flipkart_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('flipkart_user');
    localStorage.removeItem('flipkart_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
