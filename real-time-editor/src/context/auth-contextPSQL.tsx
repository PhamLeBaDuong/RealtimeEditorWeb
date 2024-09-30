// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// import {UserInfo} from "./user-model";

interface User {
    id: string,
    name: string,
    email: string,
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setUser(await response.json());
      navigate("/homepage");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
        const body = {email, username, password}
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: "include" 
      });
      setUser(await response.json());
      navigate("/homepage");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
