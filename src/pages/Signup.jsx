import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { BRAND, DAY_NAMES_ES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { CheckIcon, PlusIcon, TrashIcon } from "@/components/ui/Icons";
import toast from "react-hot-toast";
import PageTransition from "@/components/ui/PageTransition";

export default function Signup() {
  const { signUp, session, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Step 2: Doctor info
  const [clinicName, setClinicName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [slug, setSlug] = useState("");

  // Step 3: Services & Schedule
  const [services, setServices] = useState([
    { name: "", duration: 30, price: 500 },
  ]);
  const [schedule, setSchedule] = useState(
    Array.from({ length: 7 }, (_, i) => ({
      day_of_week: i,
      start_time: "09:00",
      end_time: i === 5 ? "14:00" : i === 6 ? "13:00" : "18:00",
      active: i !== 0, // Sunday off
    }))
  );

  if (!loading && session && step === 1) return <Navigate to="/dashboard" replace />;

  const handleStep1 = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setSubmitting(true);
    const generatedSlug = slugify(name);
    setSlug(generatedSlug);
    const { error } = await signUp(email, password, {
      name,
      slug: generatedSlug,
    });
    if (error) {
      toast.error(error.message);
      setSubmitting(false);
      return;
    }
    toast.success("¡Cuenta creada! Configura tu consultorio");
    setStep(2);
    setSubmitting(false);
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    if (!clinicName || !specialty || !phone) return;
    setSubmitting(true);

    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (!currentSession) {
      toast.error("Sesión expirada. Inicia sesión de nuevo.");
      setSubmitting(false);
      return;
    }

    const finalSlug = slug || slugify(name);
    const { error } = await supabase
      .from("doctors")
      .update({
        clinic_name: clinicName,
        specialty,
        phone,
        address,
        slug: finalSlug,
        name,
      })
      .eq("id", currentSession.user.id);

    if (error) {
      toast.error("Error al guardar: " + error.message);
      setSubmitting(false);
      return;
    }
    setStep(3);
    setSubmitting(false);
  };

  const handleStep3 = async (e) => {
    e.preventDefault();
    const validServices = services.filter((s) => s.name.trim());
    if (validServices.length === 0) {
      toast.error("Agrega al menos un servicio");
      return;
    }
    setSubmitting(true);

    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (!currentSession) {
      toast.error("Sesión expirada");
      setSubmitting(false);
      return;
    }
    const doctorId = currentSession.user.id;

    // Insert services
    const { error: svcError } = await supabase.from("services").insert(
      validServices.map((s, i) => ({
        doctor_id: doctorId,
        name: s.name,
        duration_minutes: s.duration,
        price: s.price,
        sort_order: i,
      }))
    );
    if (svcError) {
      toast.error("Error al guardar servicios: " + svcError.message);
      setSubmitting(false);
      return;
    }

    // Insert schedule
    const { error: schedError } = await supabase.from("schedules").insert(
      schedule.map((s) => ({
        doctor_id: doctorId,
        day_of_week: s.day_of_week,
        start_time: s.start_time,
        end_time: s.end_time,
        active: s.active,
      }))
    );
    if (schedError) {
      toast.error("Error al guardar horarios: " + schedError.message);
      setSubmitting(false);
      return;
    }

    toast.success("¡Consultorio configurado! Bienvenido a CitaMed");
    navigate("/dashboard");
  };

  const addService = () => {
    setServices([...services, { name: "", duration: 30, price: 500 }]);
  };

  const removeService = (i) => {
    setServices(services.filter((_, idx) => idx !== i));
  };

  const updateService = (i, field, value) => {
    const updated = [...services];
    updated[i] = { ...updated[i], [field]: value };
    setServices(updated);
  };

  const toggleDay = (i) => {
    const updated = [...schedule];
    updated[i] = { ...updated[i], active: !updated[i].active };
    setSchedule(updated);
  };

  const updateScheduleTime = (i, field, value) => {
    const updated = [...schedule];
    updated[i] = { ...updated[i], [field]: value };
    setSchedule(updated);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-primary-pale to-white flex items-center justify-center p-5">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
              🦷
            </div>
            <h1 className="font-display text-2xl text-dark">{BRAND.name}</h1>
          </div>

          {/* Progress */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-20 h-1.5 rounded-full transition-all ${
                  step >= s ? "bg-primary" : "bg-gray-light"
                }`}
              />
            ))}
          </div>

          <Card className="p-6 sm:p-8">
            {/* Step 1: Account */}
            {step === 1 && (
              <form onSubmit={handleStep1} className="flex flex-col gap-4">
                <div className="mb-2">
                  <h2 className="font-display text-xl text-dark">
                    Crea tu cuenta
                  </h2>
                  <p className="text-gray text-sm mt-1">
                    Paso 1 de 3 — Datos de acceso
                  </p>
                </div>
                <Input
                  label="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Carlos Méndez"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@ejemplo.com"
                  required
                />
                <Input
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Creando cuenta..." : "Continuar →"}
                </Button>
                <p className="text-center text-sm text-gray">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-semibold hover:underline"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </form>
            )}

            {/* Step 2: Doctor Info */}
            {step === 2 && (
              <form onSubmit={handleStep2} className="flex flex-col gap-4">
                <div className="mb-2">
                  <h2 className="font-display text-xl text-dark">
                    Tu consultorio
                  </h2>
                  <p className="text-gray text-sm mt-1">
                    Paso 2 de 3 — Información del consultorio
                  </p>
                </div>
                <Input
                  label="Nombre del consultorio"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="Consultorio Dental Méndez"
                  required
                />
                <Input
                  label="Especialidad"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="Odontología General"
                  required
                />
                <Input
                  label="Teléfono (WhatsApp)"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="2221234567"
                  required
                />
                <Input
                  label="Dirección (opcional)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av. Juárez 245, Col. Centro, Puebla"
                />
                <div>
                  <label className="block text-xs font-semibold text-dark mb-1.5">
                    Tu link de citas
                  </label>
                  <div className="flex items-center gap-0 border-2 border-gray-light rounded-[10px] overflow-hidden">
                    <span className="bg-gray-light px-3 py-3 text-sm text-gray whitespace-nowrap">
                      citamed.com/citas/
                    </span>
                    <input
                      value={slug}
                      onChange={(e) => setSlug(slugify(e.target.value))}
                      className="flex-1 px-2 py-3 text-sm outline-none"
                      placeholder="dr-carlos-mendez"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    ← Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1"
                  >
                    {submitting ? "Guardando..." : "Continuar →"}
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Services & Schedule */}
            {step === 3 && (
              <form onSubmit={handleStep3} className="flex flex-col gap-5">
                <div className="mb-1">
                  <h2 className="font-display text-xl text-dark">
                    Servicios y horarios
                  </h2>
                  <p className="text-gray text-sm mt-1">
                    Paso 3 de 3 — Configura tu agenda
                  </p>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-sm font-semibold text-dark mb-3">
                    Servicios
                  </h3>
                  <div className="flex flex-col gap-3">
                    {services.map((svc, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <div className="flex-1">
                          <input
                            value={svc.name}
                            onChange={(e) =>
                              updateService(i, "name", e.target.value)
                            }
                            placeholder="Ej: Consulta General"
                            className="w-full px-3 py-2 border-2 border-gray-light rounded-lg text-sm outline-none focus:border-primary"
                          />
                        </div>
                        <input
                          type="number"
                          value={svc.duration}
                          onChange={(e) =>
                            updateService(i, "duration", Number(e.target.value))
                          }
                          className="w-16 px-2 py-2 border-2 border-gray-light rounded-lg text-sm outline-none focus:border-primary text-center"
                          placeholder="min"
                        />
                        <input
                          type="number"
                          value={svc.price}
                          onChange={(e) =>
                            updateService(i, "price", Number(e.target.value))
                          }
                          className="w-20 px-2 py-2 border-2 border-gray-light rounded-lg text-sm outline-none focus:border-primary text-center"
                          placeholder="$"
                        />
                        {services.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeService(i)}
                            className="p-2 text-danger hover:bg-danger-light rounded-lg cursor-pointer"
                          >
                            <TrashIcon size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addService}
                    className="mt-2 flex items-center gap-1 text-sm text-primary font-medium hover:underline cursor-pointer"
                  >
                    <PlusIcon size={14} /> Agregar servicio
                  </button>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="text-sm font-semibold text-dark mb-3">
                    Horario semanal
                  </h3>
                  <div className="flex flex-col gap-2">
                    {schedule.map((day, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-1.5"
                      >
                        <button
                          type="button"
                          onClick={() => toggleDay(i)}
                          className={`w-8 h-5 rounded-full transition-all relative cursor-pointer ${
                            day.active ? "bg-primary" : "bg-gray-light"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${
                              day.active ? "left-3.5" : "left-0.5"
                            }`}
                          />
                        </button>
                        <span
                          className={`w-24 text-sm capitalize ${
                            day.active ? "text-dark font-medium" : "text-gray"
                          }`}
                        >
                          {DAY_NAMES_ES[day.day_of_week]}
                        </span>
                        {day.active && (
                          <div className="flex items-center gap-1 text-sm">
                            <input
                              type="time"
                              value={day.start_time}
                              onChange={(e) =>
                                updateScheduleTime(
                                  i,
                                  "start_time",
                                  e.target.value
                                )
                              }
                              className="px-2 py-1 border border-gray-light rounded-lg outline-none text-sm"
                            />
                            <span className="text-gray">a</span>
                            <input
                              type="time"
                              value={day.end_time}
                              onChange={(e) =>
                                updateScheduleTime(
                                  i,
                                  "end_time",
                                  e.target.value
                                )
                              }
                              className="px-2 py-1 border border-gray-light rounded-lg outline-none text-sm"
                            />
                          </div>
                        )}
                        {!day.active && (
                          <span className="text-xs text-gray">Cerrado</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    ← Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    variant="accent"
                    className="flex-1"
                  >
                    {submitting ? "Guardando..." : "¡Listo! Ir al panel →"}
                  </Button>
                </div>
              </form>
            )}
          </Card>

          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-gray hover:text-primary">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
