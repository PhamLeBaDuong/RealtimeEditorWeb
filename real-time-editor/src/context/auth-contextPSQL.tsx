// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {}, // Default empty function
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    // Get initial value from localStorage on component mount
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  })

  useEffect(() => {
    //Update localStorage whenever isAuthenticated changes
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  },[isAuthenticated])
  // useEffect(() => {
  //   const unsubscribe = userStateListener((user) => {
  //     if (user) {
  //       setCurrentUser(user)
  //     }
  //   });
  //   return unsubscribe
  // }, [setCurrentUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated,setAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

