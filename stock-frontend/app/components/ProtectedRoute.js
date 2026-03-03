"use client";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return showLogin ? 
      <Login onSwitch={() => setShowLogin(false)} /> : 
      <Signup onSwitch={() => setShowLogin(true)} />;
  }

  return children;
}
