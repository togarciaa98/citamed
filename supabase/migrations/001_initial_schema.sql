-- CitaMed - Initial Schema
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================
create type appointment_status as enum (
  'pending', 'confirmed', 'completed', 'cancelled', 'no_show'
);

create type subscription_plan as enum ('free', 'basic', 'pro');
create type subscription_status as enum ('active', 'past_due', 'cancelled', 'trialing');

-- ============================================================
-- DOCTORS (extends auth.users)
-- ============================================================
create table public.doctors (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null,
  specialty   text not null default '',
  clinic_name text not null default '',
  address     text not null default '',
  city        text not null default 'Puebla',
  state       text not null default 'Puebla',
  phone       text not null default '',
  slug        text unique not null,
  logo_url    text,
  photo_url   text,
  slot_duration integer not null default 30,
  created_at  timestamptz not null default now()
);

create unique index doctors_slug_idx on public.doctors(slug);

-- ============================================================
-- SERVICES
-- ============================================================
create table public.services (
  id          uuid primary key default uuid_generate_v4(),
  doctor_id   uuid not null references public.doctors(id) on delete cascade,
  name        text not null,
  duration_minutes integer not null default 30,
  price       decimal(10,2) not null default 0,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index services_doctor_idx on public.services(doctor_id);

-- ============================================================
-- SCHEDULES (weekly recurring)
-- ============================================================
create table public.schedules (
  id          uuid primary key default uuid_generate_v4(),
  doctor_id   uuid not null references public.doctors(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time  time not null,
  end_time    time not null,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  unique(doctor_id, day_of_week)
);

create index schedules_doctor_idx on public.schedules(doctor_id);

-- ============================================================
-- PATIENTS
-- ============================================================
create table public.patients (
  id          uuid primary key default uuid_generate_v4(),
  doctor_id   uuid not null references public.doctors(id) on delete cascade,
  name        text not null,
  phone       text not null,
  email       text,
  notes       text default '',
  created_at  timestamptz not null default now(),
  unique(doctor_id, phone)
);

create index patients_doctor_idx on public.patients(doctor_id);

-- ============================================================
-- APPOINTMENTS
-- ============================================================
create table public.appointments (
  id          uuid primary key default uuid_generate_v4(),
  doctor_id   uuid not null references public.doctors(id) on delete cascade,
  patient_id  uuid references public.patients(id) on delete set null,
  service_id  uuid not null references public.services(id) on delete restrict,
  date        date not null,
  start_time  time not null,
  end_time    time not null,
  status      appointment_status not null default 'pending',
  notes       text default '',
  created_at  timestamptz not null default now()
);

create index appointments_doctor_date_idx on public.appointments(doctor_id, date);
create index appointments_patient_idx on public.appointments(patient_id);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create table public.subscriptions (
  id                      uuid primary key default uuid_generate_v4(),
  doctor_id               uuid unique not null references public.doctors(id) on delete cascade,
  plan                    subscription_plan not null default 'free',
  status                  subscription_status not null default 'active',
  conekta_subscription_id text,
  conekta_customer_id     text,
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  created_at              timestamptz not null default now()
);
