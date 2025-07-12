import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, user: null });

  useEffect(() => {
    API.get("/users/me")
      .then((res) => {
        setAuth({ loading: false, user: res.data.user });
      })
      .catch(() => {
        setAuth({ loading: false, user: null });
      });
  }, []);

  if (auth.loading) return <div>Loading...</div>;
  if (!auth.user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
