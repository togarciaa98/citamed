import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Booking from "@/pages/Booking";
import Settings from "@/pages/Settings";
import Patients from "@/pages/Patients";
import { BRAND } from "@/lib/constants";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center p-5">
      <div className="text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="font-display text-2xl text-dark mb-2">
          Página no encontrada
        </h1>
        <p className="text-gray text-sm mb-6">
          La página que buscas no existe.
        </p>
        <Link
          to="/"
          className="text-primary font-semibold hover:underline text-sm"
        >
          Ir a la página principal
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/citas/:slug" element={<Booking />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
          },
        }}
      />
    </AuthProvider>
  );
}
