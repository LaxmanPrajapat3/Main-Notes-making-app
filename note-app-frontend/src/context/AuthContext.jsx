
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_BASE_URL;

// --- NEW: AXIOS INTERCEPTOR ---
// This code will run for every API request we make.
axios.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
// ----------------------------

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  const requestOtp = async (email) => {
    await axios.post(`${API_URL}/auth/request-otp`, { email });
  };
  
  const signup = async (name, email, otp) => {
    const res = await axios.post(`${API_URL}/auth/signup`, { name, email, otp });
    const { token } = res.data;
    localStorage.setItem('token', token);
    setToken(token);
  };
  
  const login = async (email, otp) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, otp });
    const { token } = res.data;
    localStorage.setItem('token', token);
    setToken(token);
  };

  const googleSignIn = async (googleToken) => {
    try {
      const res = await axios.post(`${API_URL}/auth/google`, {
        token: googleToken,
      });
      const { token: backendToken } = res.data;
      localStorage.setItem('token', backendToken);
      setToken(backendToken);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw new Error(error.response?.data?.message || 'Google Sign-In Failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    requestOtp,
    signup,
    login,
    googleSignIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

