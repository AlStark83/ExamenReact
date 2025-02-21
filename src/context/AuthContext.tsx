import { createContext, useContext, useState, useMemo } from "react";
import { ReactNode } from "react";

interface User {
  username: string;
}

const AuthContext = createContext<{ user: User | null, login: (username: string, password: string) => void, logout: () => void }>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username:string, password:string) => {
    const validUsername = import.meta.env.VITE_APP_USERNAME;
    const validPassword = import.meta.env.VITE_APP_PASSWORD;
    
    if (username === validUsername && password === validPassword) {
      setUser({ username });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
