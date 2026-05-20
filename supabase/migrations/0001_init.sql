-- ============================================================================
-- Pousada Olivia · schema inicial
-- Aplicar no Supabase via SQL Editor ou `supabase db push`.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------- Tabelas ----------

create table if not exists public.rooms (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  description       text not null default '',
  capacity_adults   int  not null check (capacity_adults >= 1),
  capacity_children int  not null default 0 check (capacity_children >= 0),
  base_price        numeric(10,2) not null check (base_price >= 0),
  image_url         text not null default '',
  gallery           jsonb not null default '[]'::jsonb,
  amenities         jsonb not null default '[]'::jsonb,
  beds              text not null default '',
  is_active         boolean not null default true,
  created_at        timestamptz not null default now()
);

create type public.booking_status as enum ('pendente','confirmada','cancelada','finalizada');

create table if not exists public.bookings (
  id           uuid primary key default gen_random_uuid(),
  room_id      uuid not null references public.rooms(id) on delete restrict,
  guest_name   text not null,
  guest_email  text not null,
  guest_phone  text not null,
  check_in     date not null,
  check_out    date not null,
  adults       int  not null check (adults >= 1),
  children     int  not null default 0 check (children >= 0),
  total_price  numeric(10,2) not null default 0,
  status       public.booking_status not null default 'pendente',
  notes        text,
  created_at   timestamptz not null default now(),
  -- Impede reserva com checkout antes/igual ao checkin
  constraint chk_dates check (check_out > check_in)
);

create index if not exists idx_bookings_room_dates on public.bookings(room_id, check_in, check_out);
create index if not exists idx_bookings_status on public.bookings(status);

create table if not exists public.blocked_dates (
  id          uuid primary key default gen_random_uuid(),
  room_id     uuid references public.rooms(id) on delete cascade, -- null = todos os quartos
  start_date  date not null,
  end_date    date not null,
  reason      text,
  created_at  timestamptz not null default now(),
  constraint chk_block_dates check (end_date > start_date)
);

create table if not exists public.seasonal_prices (
  id              uuid primary key default gen_random_uuid(),
  room_id         uuid not null references public.rooms(id) on delete cascade,
  start_date      date not null,
  end_date        date not null,
  price_per_night numeric(10,2) not null check (price_per_night >= 0),
  label           text,
  created_at      timestamptz not null default now(),
  constraint chk_season_dates check (end_date > start_date)
);

create table if not exists public.settings (
  id                int primary key default 1,
  whatsapp_number   text,
  instagram_url     text,
  address           text,
  google_maps_url   text,
  checkin_time      text default '14:00',
  checkout_time     text default '12:00',
  updated_at        timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);

insert into public.settings (id) values (1)
on conflict (id) do nothing;

-- ---------- Funcoes ----------

-- Verifica se um quarto esta disponivel para um intervalo [check_in, check_out).
create or replace function public.check_availability(
  p_room_id  uuid,
  p_check_in date,
  p_check_out date
) returns boolean
language plpgsql
stable
as $$
declare
  v_blocked int;
  v_booked  int;
begin
  if p_check_out <= p_check_in then
    return false;
  end if;

  select count(*) into v_blocked
  from public.blocked_dates b
  where (b.room_id = p_room_id or b.room_id is null)
    and b.start_date < p_check_out
    and b.end_date   > p_check_in;
  if v_blocked > 0 then
    return false;
  end if;

  select count(*) into v_booked
  from public.bookings bk
  where bk.room_id = p_room_id
    and bk.status <> 'cancelada'
    and bk.check_in  < p_check_out
    and bk.check_out > p_check_in;
  return v_booked = 0;
end;
$$;

-- Calcula o total de diarias aplicando precos sazonais quando existem.
create or replace function public.calc_total(
  p_room_id   uuid,
  p_check_in  date,
  p_check_out date
) returns numeric
language plpgsql
stable
as $$
declare
  v_total numeric := 0;
  v_base  numeric;
  v_day   date;
  v_price numeric;
begin
  if p_check_out <= p_check_in then
    return 0;
  end if;

  select base_price into v_base from public.rooms where id = p_room_id;
  if v_base is null then
    return 0;
  end if;

  v_day := p_check_in;
  while v_day < p_check_out loop
    select price_per_night into v_price
    from public.seasonal_prices sp
    where sp.room_id = p_room_id
      and v_day >= sp.start_date
      and v_day <  sp.end_date
    order by sp.start_date desc
    limit 1;

    v_total := v_total + coalesce(v_price, v_base);
    v_day := v_day + interval '1 day';
  end loop;

  return v_total;
end;
$$;

-- Trigger: bloqueia inserts/updates em datas indisponiveis e calcula total.
create or replace function public.bookings_validate()
returns trigger
language plpgsql
as $$
begin
  if new.status <> 'cancelada' then
    if not public.check_availability(new.room_id, new.check_in, new.check_out) then
      raise exception 'Quarto indisponivel para o intervalo solicitado';
    end if;
  end if;

  if new.total_price is null or new.total_price = 0 then
    new.total_price := public.calc_total(new.room_id, new.check_in, new.check_out);
  end if;

  return new;
end;
$$;

drop trigger if exists trg_bookings_validate on public.bookings;
create trigger trg_bookings_validate
  before insert or update on public.bookings
  for each row execute function public.bookings_validate();

-- ---------- RLS ----------

alter table public.rooms           enable row level security;
alter table public.bookings        enable row level security;
alter table public.blocked_dates   enable row level security;
alter table public.seasonal_prices enable row level security;
alter table public.settings        enable row level security;

-- Leitura publica das tabelas necessarias ao site (apenas SELECT, dados nao-sensiveis).
create policy "public read rooms"           on public.rooms           for select using (is_active);
create policy "public read blocked_dates"   on public.blocked_dates   for select using (true);
create policy "public read seasonal_prices" on public.seasonal_prices for select using (true);
create policy "public read settings"        on public.settings        for select using (true);

-- Bookings: o publico pode INSERIR pedidos (status default = pendente), nao pode ler nem alterar.
create policy "public insert bookings" on public.bookings for insert with check (status = 'pendente');

-- Admin (utilizadores autenticados via Supabase Auth) tem acesso total.
create policy "admin all rooms"           on public.rooms           for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all bookings"        on public.bookings        for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all blocked"         on public.blocked_dates   for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all seasons"         on public.seasonal_prices for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all settings"        on public.settings        for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- Seed (dados de demonstracao) ----------

insert into public.rooms (slug, name, description, capacity_adults, capacity_children, base_price, image_url, amenities, beds) values
  ('casal', 'Suite Casal',
   'Suite acolhedora para dois, com cama queen, ar-condicionado, varanda e enxoval premium.',
   2, 0, 380,
   'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
   '["Ar-condicionado","Smart TV","Wi-Fi","Frigobar"]'::jsonb, '1 cama queen'),
  ('familia', 'Quarto Familia',
   'Espacoso e luminoso para familias. Cama de casal + duas de solteiro.',
   2, 2, 550,
   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80',
   '["Ar-condicionado","Smart TV","Wi-Fi","Frigobar"]'::jsonb, '1 casal + 2 solteiros'),
  ('triplo', 'Suite Tripla',
   'Tres camas confortaveis, ambiente arejado e decoracao em tons claros.',
   3, 1, 450,
   'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
   '["Ar-condicionado","Wi-Fi","Frigobar","Cofre"]'::jsonb, '3 camas de solteiro'),
  ('economico', 'Quarto Economico',
   'Opcao enxuta e aconchegante, a poucos passos da praia e da lagoa.',
   2, 0, 290,
   'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80',
   '["Ventilador","Wi-Fi","TV"]'::jsonb, '1 cama de casal')
on conflict (slug) do nothing;
