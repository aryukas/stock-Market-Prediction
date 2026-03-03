"use client";
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../lib/auth';

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Stock Analyzer</h1>
        <div className="flex items-center gap-4">
          <span>{user.email}</span>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
