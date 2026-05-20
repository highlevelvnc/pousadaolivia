# Pousada Olivia

Site oficial da **Pousada Olivia** — Praia Linda / Balneario, Sao Pedro da Aldeia - RJ.
Stack: **Next.js 15 (App Router) + TypeScript + Tailwind + Supabase + Framer Motion + Zod + RHF + date-fns + lucide-react**.

## Funcionalidades

- Landing premium (hero, sobre, quartos, diferenciais, galeria com lightbox, depoimentos, localizacao, FAQ, CTA).
- Sistema de reservas (wizard 3 passos: datas → quartos disponiveis → dados do hospede).
- Integracao WhatsApp com mensagem pre-formatada por reserva.
- Painel admin protegido por Supabase Auth: dashboard, quartos, reservas, bloqueios, configuracoes.
- API REST `/api/availability` e `/api/bookings` com validacao Zod.
- **Mock-mode** automatico: o site corre 100% sem Supabase usando dados ficticios. Basta colar as env vars para activar o backend real.
- SEO: metadata, OG, sitemap, robots, schema.org `LodgingBusiness`.
- Acessibilidade e respeito a `prefers-reduced-motion`.

---

## Como rodar

```bash
npm install
cp .env.example .env.local   # opcional — sem isto corre em mock-mode
npm run dev
```

Abrir <http://localhost:3000>. Admin em <http://localhost:3000/admin>.

---

## Estrutura

```
src/
  app/
    (site)/           # site publico
    (admin)/admin/    # painel administrativo
    api/              # availability + bookings
  components/
    site/             # Header, Hero, Footer, FAB, secoes
    booking/          # Wizard de reserva
  lib/
    constants.ts      # contactos, links, WhatsApp
    data.ts           # camada de acesso (Supabase OU mock)
    booking/          # types, availability, pricing, whatsapp, mock-data
    supabase/         # client/server/admin + env
supabase/
  migrations/0001_init.sql
```

---

## Configurar Supabase (backend real)

1. Cria projecto em <https://supabase.com> e copia URL + anon key + service role.
2. No SQL Editor do Supabase, executa o conteudo de `supabase/migrations/0001_init.sql`. Cria tabelas, RLS, funcoes (`check_availability`, `calc_total`), trigger de validacao e seed de quartos.
3. Cria um user admin em **Authentication → Users → Add user** (define password). Esse user faz login em `/admin/login`.
4. Preenche `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

5. Reinicia o dev server. Agora as paginas leem do Supabase e as reservas sao persistidas.

> **RLS:** publico pode ler `rooms` activos e inserir `bookings` com status `pendente`. Tudo o resto exige sessao autenticada.

---

## Variaveis de ambiente

Ver `.env.example`. Resumo:

| Var | Para que serve | Onde aparece |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical, OG, sitemap | metadata |
| `NEXT_PUBLIC_SUPABASE_URL` / `..._ANON_KEY` | Cliente Supabase (browser + SSR) | data layer |
| `SUPABASE_SERVICE_ROLE_KEY` | Cliente admin server-side | `/api/bookings` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numero `wa.me` (so digitos) | FAB, CTAs, reservas |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Footer, contacto | links |
| `NEXT_PUBLIC_EMAIL` / `..._PHONE` / `..._ADDRESS` | Contactos | footer, contacto, schema |
| `NEXT_PUBLIC_GMAPS_URL` / `..._GMAPS_EMBED` | Botao "Como chegar" e iframe do mapa | localizacao, contacto |

---

## TODOs marcados no codigo

Cada local que precisa de dados reais tem um `// TODO:` proximo:

- `src/lib/constants.ts` — valores default dos contactos (sobrescritos por env vars).
- `src/lib/booking/mock-data.ts` — quartos ficticios. Substituir editando ou ligando a Supabase.
- `src/app/(site)/politicas/*` — textos juridicos a rever com a pousada.
- `src/components/site/Location.tsx` e `contato/page.tsx` — embed do Google Maps.
- `src/app/(admin)/admin/quartos/*` e `bloqueios/page.tsx` — formularios de CRUD (estrutura ja pronta, falta ligar a Supabase REST).
- `public/logo.png` / `public/og.jpg` / `public/favicon.ico` — assets reais.

---

## Mensagem WhatsApp das reservas

Construida em `src/lib/booking/whatsapp.ts`. Formato:

```
Ola, gostaria de consultar uma reserva na Pousada Olivia.

Nome: ...
Check-in: ...
Check-out: ...
Adultos: ...
Criancas: ...
Quarto escolhido: ...
Valor estimado: R$ ...
Observacoes: ...

Aguardo confirmacao de disponibilidade.
```

Disponivel automaticamente apos enviar o formulario em `/reserva` (botao na pagina de confirmacao).

---

## Deploy (Vercel)

1. Sobe o repo no GitHub.
2. Em <https://vercel.com> escolhe **New Project** → importa o repo.
3. Cola as env vars em **Settings → Environment Variables** (as mesmas do `.env.local`).
4. Deploy. Dominio default `*.vercel.app`; depois associa o dominio proprio em **Settings → Domains**.

---

## Roadmap curto sugerido

- [ ] Substituir fotos `unsplash` por fotos reais da pousada em `public/portfolio/`.
- [ ] Ligar formularios do admin (POST/PATCH/DELETE) para `/api/admin/*`.
- [ ] Integracao de e-mail transacional (Resend / Brevo) ao receber pedido de reserva.
- [ ] Importar Google Reviews na seccao de depoimentos.
- [ ] Configurar dominio + Google Search Console + Google Business Profile.
