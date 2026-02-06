-- CitaMed - Seed Data (development only)
-- This file populates the database with sample data for testing.
-- NOTE: Run this only after creating a test user via Supabase Auth.
-- Replace 'YOUR_TEST_USER_UUID' with the actual user UUID.

-- Example usage:
-- 1. Create a user via Supabase Auth dashboard or signUp API
-- 2. Replace the UUID below
-- 3. Run: psql -f seed.sql

-- UPDATE public.doctors SET
--   name = 'Dr. Carlos Méndez',
--   specialty = 'Odontología General',
--   clinic_name = 'Consultorio Dental Méndez',
--   address = 'Av. Juárez 245, Col. Centro, Puebla',
--   phone = '2221234567',
--   slug = 'dr-carlos-mendez',
--   slot_duration = 30
-- WHERE id = 'YOUR_TEST_USER_UUID';

-- INSERT INTO public.services (doctor_id, name, duration_minutes, price, sort_order) VALUES
--   ('YOUR_TEST_USER_UUID', 'Consulta General', 30, 500.00, 1),
--   ('YOUR_TEST_USER_UUID', 'Limpieza Dental', 45, 800.00, 2),
--   ('YOUR_TEST_USER_UUID', 'Extracción', 60, 1200.00, 3),
--   ('YOUR_TEST_USER_UUID', 'Blanqueamiento', 90, 3500.00, 4),
--   ('YOUR_TEST_USER_UUID', 'Resina/Empaste', 45, 900.00, 5);

-- INSERT INTO public.schedules (doctor_id, day_of_week, start_time, end_time, active) VALUES
--   ('YOUR_TEST_USER_UUID', 1, '09:00', '18:00', true),  -- Lunes
--   ('YOUR_TEST_USER_UUID', 2, '09:00', '18:00', true),  -- Martes
--   ('YOUR_TEST_USER_UUID', 3, '09:00', '18:00', true),  -- Miércoles
--   ('YOUR_TEST_USER_UUID', 4, '09:00', '18:00', true),  -- Jueves
--   ('YOUR_TEST_USER_UUID', 5, '09:00', '14:00', true),  -- Viernes
--   ('YOUR_TEST_USER_UUID', 6, '09:00', '13:00', true),  -- Sábado
--   ('YOUR_TEST_USER_UUID', 0, '09:00', '13:00', false);  -- Domingo (inactive)
