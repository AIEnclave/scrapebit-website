# Scrapebit Frontend

Next.js 14 web application for Scrapebit - AI-powered web scraping platform.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |

## Environment Variables

See `.env.example` for all variables.

### Required
| Variable | Description | Get From |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Your backend URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | [Supabase Dashboard](https://supabase.com/dashboard) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | [Supabase Dashboard](https://supabase.com/dashboard) |

### Customer Support
| Variable | Description | Get From |
|----------|-------------|----------|
| `NEXT_PUBLIC_CRISP_WEBSITE_ID` | Crisp chat widget ID | [Crisp Settings](https://app.crisp.chat/settings/website/) |

### Analytics (Optional)
| Variable | Description | Get From |
|----------|-------------|----------|
| `NEXT_PUBLIC_AMPLITUDE_API_KEY` | Amplitude API key | [Amplitude](https://analytics.amplitude.com/) |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking | [Sentry](https://sentry.io/) |

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── dashboard/       # Dashboard pages (protected)
│   │   ├── login/           # Auth pages
│   │   ├── pricing/         # Public pages
│   │   └── page.tsx         # Landing page
│   ├── components/          # React components
│   ├── lib/                 # Utilities (Supabase, API, etc.)
│   └── store/               # Zustand stores
├── public/                  # Static assets
└── .env.example             # Environment template
```

## Features

- **Landing Page** - Marketing pages, pricing
- **Dashboard** - User dashboard with saved scrapes
- **Scheduled Jobs** - View and manage scheduled scrapes
- **Integrations** - Connect Google Sheets, Notion, Webhooks
- **Deep Research** - AI-powered research tool
- **Settings** - User preferences and billing
- **Crisp Chat** - Live customer support widget

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Authentication
- **Zustand** - State management
- **Crisp** - Customer support chat

## Troubleshooting

**Supabase auth not working**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project settings

**API calls failing**
- Ensure backend is running
- Check `NEXT_PUBLIC_API_URL` is correct

**Crisp chat not showing**
- Verify `NEXT_PUBLIC_CRISP_WEBSITE_ID`
- Check browser console for errors

## License

MIT
