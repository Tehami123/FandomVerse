import { useMemo, useState } from 'react';
import { AuthContext } from './authContext';

const DEMO_USER_KEY = 'fandomverse_demo_user';
const DEMO_SESSION_KEY = 'fandomverse_demo_session';

const hashDemoCredential = (value) => Array.from(value).reduce((hash, character) => ((hash << 5) - hash + character.charCodeAt(0)) | 0, 0).toString(16);

const readStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
};

const writeStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const readInitialUser = () => {
  const session = readStorage(DEMO_SESSION_KEY);
  const storedUser = readStorage(DEMO_USER_KEY);
  return session?.authenticated && storedUser ? storedUser : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readInitialUser);
  const [isReady] = useState(true);

  const signup = (profile) => {
    const demoUser = {
      name: profile.name.trim(),
      email: profile.email.trim().toLowerCase(),
      // This fingerprint is deliberately demo-only and is not production security.
      demoCredential: hashDemoCredential(profile.password),
    };
    writeStorage(DEMO_USER_KEY, demoUser);
    writeStorage(DEMO_SESSION_KEY, { authenticated: true });
    setUser(demoUser);
    return demoUser;
  };

  const login = (email, password) => {
    const demoUser = readStorage(DEMO_USER_KEY);
    const normalizedEmail = email.trim().toLowerCase();
    if (!demoUser) return { success: false, error: 'No demo account exists yet. Create one through Signup first.' };
    if (demoUser.email !== normalizedEmail || demoUser.demoCredential !== hashDemoCredential(password)) {
      return { success: false, error: 'Those demo credentials do not match the registered account.' };
    }
    writeStorage(DEMO_SESSION_KEY, { authenticated: true });
    setUser(demoUser);
    return { success: true, user: demoUser };
  };

  const logout = () => {
    localStorage.removeItem(DEMO_SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), isReady, login, signup, logout }), [isReady, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
