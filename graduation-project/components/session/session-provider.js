"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useRef, useState } from "react";

export const SessionContext = createContext({
  session: undefined,
  setSession: () => {},
  datauser: undefined,
  isAuthenticated: false,
  loading: true,
  // logout: () => {},
});

const SessionProvider = ({ children, initialSession }) => {
  const SESSION_CHECK_INTERVAL = 10 * 60 * 1000;
  const intervalRef = useRef();
  const [session, setSession] = useState(initialSession);
  const [datauser, setDataUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // const logout = async () => {
  //   if (!session) return;

  //   const res = await fetch("/api/auth/logout", { method: "POST" });
  //   const result = await res.json();

  //   if (res.ok && !!result?.success) {
  //     setSession(undefined);
  //     router.refresh();
  //   }
  // };

  // 
  async function checkSession() {
    if (session) {
      const res = await fetch("http://localhost:4000/api/auth/check-auth", {
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // مهم حتى لا يستخدم الكاش
      });

      if (!res.ok) {
        clearInterval(intervalRef.current);
        setSession(undefined);
        setIsAuthenticated(false);
        setLoading(false);
        router.refresh();
      }

      const data = await res.json();
      setDataUser(data);
      setIsAuthenticated(data.success);
      setLoading(false);
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    checkSession();
    intervalRef.current = setInterval(checkSession, SESSION_CHECK_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <SessionContext.Provider
      value={{ datauser, isAuthenticated, session, setSession , loading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
