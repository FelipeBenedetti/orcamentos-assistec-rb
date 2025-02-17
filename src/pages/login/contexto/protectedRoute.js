import { Navigate } from "react-router-dom";
import { useAuth } from "./contexto";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
