import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { MailIcon, CalendarIcon } from "@/components/ui/Icons";
import PageTransition from "@/components/ui/PageTransition";

export default function Login() {
  const { signIn, signInWithOtp, session, loading } = useAuth();
  const [mode, setMode] = useState("password"); // password | magic
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  if (!loading && session) return <Navigate to="/dashboard" replace />;

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error(
        error.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos"
          : error.message
      );
    }
    setSubmitting(false);
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const { error } = await signInWithOtp(email);
    if (error) {
      toast.error(error.message);
    } else {
      setMagicSent(true);
      toast.success("Revisa tu email para el link de acceso");
    }
    setSubmitting(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-primary-pale to-white flex items-center justify-center p-5">
        <div className="bg-white rounded-[--radius-card] shadow-lg border border-border p-8 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarIcon size={28} className="text-primary" />
            </div>
            <h1 className="font-semibold text-2xl text-dark">{BRAND.name}</h1>
            <p className="text-gray text-sm mt-1">Inicia sesión en tu cuenta</p>
          </div>

          {magicSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon size={32} color="#10B981" />
              </div>
              <h3 className="font-semibold text-lg text-dark mb-2">
                Revisa tu email
              </h3>
              <p className="text-gray text-sm">
                Enviamos un link de acceso a <strong>{email}</strong>.
                Haz clic en el link para iniciar sesión.
              </p>
              <button
                onClick={() => setMagicSent(false)}
                className="mt-4 text-primary text-sm font-medium hover:underline cursor-pointer"
              >
                Volver a intentar
              </button>
            </div>
          ) : (
            <>
              {/* Mode Toggle */}
              <div className="flex gap-1 bg-gray-light rounded-[--radius-button] p-1 mb-6">
                <button
                  onClick={() => setMode("password")}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    mode === "password"
                      ? "bg-primary text-white"
                      : "text-gray hover:text-dark"
                  }`}
                >
                  Contraseña
                </button>
                <button
                  onClick={() => setMode("magic")}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    mode === "magic"
                      ? "bg-primary text-white"
                      : "text-gray hover:text-dark"
                  }`}
                >
                  Magic Link
                </button>
              </div>

              <form
                onSubmit={
                  mode === "password" ? handlePasswordLogin : handleMagicLink
                }
                className="flex flex-col gap-4"
              >
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@ejemplo.com"
                  required
                />
                {mode === "password" && (
                  <Input
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                    required
                  />
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2"
                >
                  {submitting
                    ? "Cargando..."
                    : mode === "password"
                    ? "Iniciar Sesión"
                    : "Enviar Magic Link"}
                </Button>
              </form>

              <p className="text-center text-sm text-gray mt-6">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:underline"
                >
                  Regístrate gratis
                </Link>
              </p>
            </>
          )}

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray hover:text-primary">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
