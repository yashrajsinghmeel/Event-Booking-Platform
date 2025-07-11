// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import API from "../services/api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, refetch: fetchUser };
}
