import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray text-sm">Cargando...</p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
