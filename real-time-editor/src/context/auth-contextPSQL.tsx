// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  setUid: (value: Number) => void;
  uid: Number;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {}, // Default empty function,
  uid: Number(0),
  setUid: () => {}
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    // Get initial value from localStorage on component mount
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  })

  const [uid, setUid] = useState<Number>(() => {
    const storeUid = localStorage.getItem("uid");
    return storeUid !== null ? Number(storeUid) : Number(0);
  })

  useEffect(() => {
    //Update localStorage whenever isAuthenticated changes
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("uid", uid.toString());
    console.log(uid.toString());
  },[isAuthenticated, uid])
  // useEffect(() => {
  //   const unsubscribe = userStateListener((user) => {
  //     if (user) {
  //       setCurrentUser(user)
  //     }
  //   });
  //   return unsubscribe
  // }, [setCurrentUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated,setAuthenticated, uid, setUid}}>
      {children}
    </AuthContext.Provider>
  );
};

