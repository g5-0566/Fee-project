import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { loginUser as apiLogin, registerUser as apiRegister } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('queueless_auth_user', null);

  // Login handler
  const login = async (email, password) => {
    const verifiedUser = await apiLogin(email, password);
    setUser(verifiedUser);
    return verifiedUser;
  };

  // Register handler
  const register = async (userData) => {
    const newUser = await apiRegister(userData);
    setUser(newUser);
    return newUser;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    role: user ? user.role : null,
    login,
    register,
    logout
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
