import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Eager-loaded pages (needed immediately)
import Home from "@/pages/Home";

// Lazy-loaded pages
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Booking = lazy(() => import("@/pages/Booking"));
const Settings = lazy(() => import("@/pages/Settings"));
const Patients = lazy(() => import("@/pages/Patients"));
const Reports = lazy(() => import("@/pages/Reports"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-5">
        <div className="bg-white rounded-[--radius-card] border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gray-light animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded-lg bg-gray-light animate-pulse" />
              <div className="h-3 w-1/2 rounded-lg bg-gray-light animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded-lg bg-gray-light animate-pulse" />
            <div className="h-3 w-5/6 rounded-lg bg-gray-light animate-pulse" />
          </div>
        </div>
        <div className="bg-white rounded-[--radius-card] border border-border p-5">
          <div className="space-y-2">
            <div className="h-4 w-2/3 rounded-lg bg-gray-light animate-pulse" />
            <div className="h-3 w-full rounded-lg bg-gray-light animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-5">
      <div className="text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="font-semibold text-2xl text-dark mb-2">
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
        <Suspense fallback={<PageLoader />}>
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
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "14px",
          },
        }}
      />
    </AuthProvider>
  );
}
