# ⚡ Abyss AI Labs — Landing Page

> **Human Intelligence for Better AI Systems**
>
> A high-conversion, production-ready Next.js 15 landing page for an AI evaluation agency.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ 
- npm / yarn / pnpm

### 1. Install dependencies

```bash
cd abyss-ai-labs
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your values (see Configuration section)
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
abyss-ai-labs/
├── app/
│   ├── globals.css          # Global styles, CSS variables, animations
│   ├── layout.tsx           # Root layout — fonts, ThemeProvider, metadata
│   ├── page.tsx             # Landing page (composes all sections)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts     # POST /api/contact — form submission handler
│   ├── terms/
│   │   └── page.tsx         # /terms — Terms & Conditions page
│   └── disclaimer/
│       └── page.tsx         # /disclaimer — Disclaimer page
│
├── components/
│   ├── Navbar.tsx            # Fixed nav, smooth scroll, mobile hamburger
│   ├── ThemeToggle.tsx       # Dark/light mode toggle with animation
│   ├── Hero.tsx              # Hero section — neural canvas, typewriter CTA
│   ├── SampleEvaluation.tsx  # 3 eval cards with A/B comparison + scores
│   ├── HowItWorks.tsx        # 5-step process with animated timeline
│   ├── WhyChooseUs.tsx       # 6 feature cards + comparison table
│   ├── FutureVision.tsx      # Decentralized AI vision + roadmap cards
│   ├── Trust.tsx             # Trust pillars + testimonials
│   └── Footer.tsx            # Contact form + links + social
│
├── lib/
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
│
├── types/
│   └── index.ts              # Shared TypeScript interfaces
│
├── public/
│   ├── favicon.svg           # SVG favicon (replace with your own)
│   └── og-image.svg          # Open Graph image placeholder
│
├── schema.sql                # Optional PostgreSQL schema for future scaling
├── tailwind.config.ts        # Tailwind with custom design tokens
├── next.config.js            # Next.js config
├── tsconfig.json             # TypeScript config
└── .env.example              # Environment variable template
```

---

## 🎨 Design System

### Colors

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--neon` | `#00ff88` | `#059669` | Primary accent, CTAs |
| `--background` | `#020709` | `#f8fafb` | Page background |
| `--surface` | `#0a1520` | `#ffffff` | Card backgrounds |
| `--text-primary` | `#e8f5ef` | `#0a0e14` | Headings |
| `--text-secondary` | `#94b8a8` | `#4a5568` | Body text |

### Typography

| Font | Variable | Usage |
|------|----------|-------|
| Orbitron | `--font-orbitron` | Brand logo, display numbers |
| Outfit | `--font-outfit` | Headings, section titles |
| DM Sans | `--font-dm-sans` | Body text, descriptions |
| IBM Plex Mono | `--font-ibm-plex-mono` | Code, badges, labels |

---

## ⚙️ Configuration

### Contact Form

The contact form at `/api/contact` currently **logs submissions** in development. To enable real email delivery, open `app/api/contact/route.ts` and uncomment one of:

**Option A — Resend (recommended):**
```bash
npm install resend
```
```env
RESEND_API_KEY=re_xxxx
```

**Option B — SendGrid:**
```bash
npm install @sendgrid/mail
```
```env
SENDGRID_API_KEY=SG.xxxx
```

**Option C — SMTP/Nodemailer:**
```bash
npm install nodemailer @types/nodemailer
```
```env
SMTP_HOST=smtp.example.com
SMTP_USER=user@example.com
SMTP_PASS=password
```

---

## 🗄️ Database (Optional)

The `schema.sql` file provides a full PostgreSQL schema for:
- Contact form submissions
- Evaluation batches & tasks
- Evaluator profiles
- Score dimensions
- Aggregated views

To use it, set up a database (Supabase, Neon, PlanetScale) and:

```bash
psql $DATABASE_URL < schema.sql
```

Then add your database client (e.g., Prisma, Drizzle, Supabase JS) and connect the API routes.

---

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🌐 Deployment

### Vercel (Recommended — zero config)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — it auto-detects Next.js.

**Required env vars for production:**
- `NEXT_PUBLIC_SITE_URL` = your domain
- Your chosen email service key

### Other Platforms

Works on any Node.js 18+ environment. Set `NODE_ENV=production` and run:
```bash
npm run build && npm run start
```

---

## 🎯 Customization Checklist

Before going live, replace these placeholders:

- [ ] **Logo** — Update `Zap` icon in `Navbar.tsx` and `Footer.tsx` with your actual logo SVG
- [ ] **Favicon** — Replace `public/favicon.svg` with your favicon (also add `.ico`)
- [ ] **OG Image** — Replace `public/og-image.svg` with a real 1200×630 image
- [ ] **Domain** — Update `NEXT_PUBLIC_SITE_URL` and `metadata.openGraph.url` in `layout.tsx`
- [ ] **Email** — Connect email service in `app/api/contact/route.ts`
- [ ] **Social links** — Update URLs in `Footer.tsx` (`socials` array)
- [ ] **Contact email** — Replace `hello@abyssailabs.com` and `legal@abyssailabs.com`
- [ ] **Testimonials** — Add real testimonials to `Trust.tsx` when available
- [ ] **Analytics** — Add PostHog, Plausible, or GA4 in `app/layout.tsx`

---

## 🔒 Sections & Routes

| Route | Description |
|-------|-------------|
| `/` | Main landing page with all sections |
| `/terms` | Terms & Conditions |
| `/disclaimer` | Disclaimer |
| `/api/contact` | `POST` — Contact form handler |

**Smooth-scroll sections** (via `#id`):
`#home` · `#evaluations` · `#how-it-works` · `#why-us` · `#vision` · `#trust` · `#contact`

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^15.3.2 | App framework (App Router) |
| `framer-motion` | ^12 | Animations |
| `next-themes` | ^0.3 | Dark/light mode |
| `lucide-react` | ^0.399 | Icon system |
| `clsx` + `tailwind-merge` | latest | Class name utilities |

---

## 🤝 License

MIT — free to use, modify, and deploy for your business.

---

*Built with precision. Designed for trust. Ready to scale.*
