import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getItemSafe, setItemSafe, STORAGE_KEYS } from '../utils/storage';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, name?: string, role?: 'user' | 'admin') => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  demoLogin: (role: 'user' | 'admin') => void;
  updateProfile: (data: Partial<User>) => void;
}

const DEFAULT_DEMO_USER: User = {
  id: 'usr-demo-01',
  name: 'Rahul Verma',
  email: 'rahul.verma@example.com',
  phone: '+91 98765 43210',
  role: 'user',
  joinedDate: '2026-08-15',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return getItemSafe<User | null>(STORAGE_KEYS.USER, DEFAULT_DEMO_USER);
  });

  useEffect(() => {
    if (currentUser) {
      setItemSafe(STORAGE_KEYS.USER, currentUser);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  const login = (email: string, name: string = 'Demo User', role: 'user' | 'admin' = 'user') => {
    const user: User = {
      id: `usr-${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      phone: '+91 98765 43210',
      role,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };
    setCurrentUser(user);
  };

  const register = (name: string, email: string) => {
    login(email, name, 'user');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const demoLogin = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'usr-admin-01',
        name: 'Dr. Prof. Administrator',
        email: 'admin@quicktix.demo',
        phone: '+91 90000 11111',
        role: 'admin',
        joinedDate: '2026-01-01',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
    } else {
      setCurrentUser(DEFAULT_DEMO_USER);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        register,
        logout,
        demoLogin,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
