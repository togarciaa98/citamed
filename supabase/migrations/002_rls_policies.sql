-- CitaMed - Row Level Security Policies

-- Enable RLS on all tables
alter table public.doctors enable row level security;
alter table public.services enable row level security;
alter table public.schedules enable row level security;
alter table public.appointments enable row level security;
alter table public.patients enable row level security;
alter table public.subscriptions enable row level security;

-- ============================================================
-- DOCTORS
-- ============================================================
create policy "Public can read doctors"
  on public.doctors for select
  using (true);

create policy "Doctors can update own profile"
  on public.doctors for update
  using (auth.uid() = id);

create policy "Doctors can insert own profile"
  on public.doctors for insert
  with check (auth.uid() = id);

-- ============================================================
-- SERVICES
-- ============================================================
create policy "Doctors manage own services"
  on public.services for all
  using (auth.uid() = doctor_id);

create policy "Public can read active services"
  on public.services for select
  using (active = true);

-- ============================================================
-- SCHEDULES
-- ============================================================
create policy "Doctors manage own schedules"
  on public.schedules for all
  using (auth.uid() = doctor_id);

create policy "Public can read active schedules"
  on public.schedules for select
  using (active = true);

-- ============================================================
-- APPOINTMENTS
-- ============================================================
create policy "Doctors manage own appointments"
  on public.appointments for all
  using (auth.uid() = doctor_id);

create policy "Public can create appointments"
  on public.appointments for insert
  with check (true);

create policy "Public can read appointments"
  on public.appointments for select
  using (true);

-- ============================================================
-- PATIENTS
-- ============================================================
create policy "Doctors manage own patients"
  on public.patients for all
  using (auth.uid() = doctor_id);

create policy "Public can create patients"
  on public.patients for insert
  with check (true);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create policy "Doctors read own subscription"
  on public.subscriptions for select
  using (auth.uid() = doctor_id);

create policy "System can manage subscriptions"
  on public.subscriptions for all
  using (auth.uid() = doctor_id);
