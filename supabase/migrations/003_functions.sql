-- CitaMed - Database Functions

-- ============================================================
-- Auto-create doctor profile after signup
-- ============================================================
create or replace function public.handle_new_doctor()
returns trigger as $$
begin
  insert into public.doctors (id, name, slug)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(
      new.raw_user_meta_data->>'slug',
      'doc-' || substr(new.id::text, 1, 8)
    )
  );

  insert into public.subscriptions (doctor_id, plan, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_doctor();

-- ============================================================
-- Check slot availability
-- ============================================================
create or replace function public.is_slot_available(
  p_doctor_id uuid,
  p_date date,
  p_start_time time,
  p_end_time time
)
returns boolean as $$
begin
  return not exists (
    select 1 from public.appointments
    where doctor_id = p_doctor_id
      and date = p_date
      and status not in ('cancelled')
      and (start_time < p_end_time and end_time > p_start_time)
  );
end;
$$ language plpgsql security definer;

-- ============================================================
-- Book appointment (atomic operation)
-- ============================================================
create or replace function public.book_appointment(
  p_doctor_id uuid,
  p_service_id uuid,
  p_date date,
  p_start_time time,
  p_patient_name text,
  p_patient_phone text,
  p_notes text default ''
)
returns uuid as $$
declare
  v_patient_id uuid;
  v_appointment_id uuid;
  v_service record;
  v_end_time time;
begin
  -- Get service duration
  select * into v_service from public.services
  where id = p_service_id and doctor_id = p_doctor_id and active = true;

  if not found then
    raise exception 'Servicio no encontrado o inactivo';
  end if;

  -- Calculate end time
  v_end_time := p_start_time + (v_service.duration_minutes || ' minutes')::interval;

  -- Check availability
  if not public.is_slot_available(p_doctor_id, p_date, p_start_time, v_end_time) then
    raise exception 'Este horario ya no está disponible';
  end if;

  -- Upsert patient
  insert into public.patients (doctor_id, name, phone)
  values (p_doctor_id, p_patient_name, p_patient_phone)
  on conflict (doctor_id, phone) do update set name = excluded.name
  returning id into v_patient_id;

  -- Insert appointment
  insert into public.appointments (doctor_id, patient_id, service_id, date, start_time, end_time, notes)
  values (p_doctor_id, v_patient_id, p_service_id, p_date, p_start_time, v_end_time, p_notes)
  returning id into v_appointment_id;

  return v_appointment_id;
end;
$$ language plpgsql security definer;
