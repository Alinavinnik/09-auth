"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setAuth = useAuth((store) => store.setUser);
  const clearAuth = useAuth((store) => store.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const authRes = await checkSession();
        if (authRes) {
          const user = await getMe();
          setAuth(user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      }
    };
    fetchSession();
  }, [setAuth, clearAuth]);

  return children;
}
