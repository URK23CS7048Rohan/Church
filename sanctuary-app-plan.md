# ⛪ SANCTUARY — Church Platform OS
### Million-Dollar App Planning Document + AI Agent Prompt
---

## 1. PRODUCT VISION

**App Name:** Sanctuary  
**Tagline:** *"Where your faith lives."*  
**Type:** Full-stack progressive web app (PWA) + optional React Native shell  
**Target:** Modern church community — all ages, mobile-first, community-driven  

Sanctuary is not just a church app. It is a digital parish. A living, breathing spiritual ecosystem that handles everything — from Sunday carpooling to live worship to financial generosity — in one breathtaking experience that makes people proud to be part of their church.

---

## 2. COMPLETE FEATURE ARCHITECTURE

### 🔴 TIER 1 — Core Platform
| Feature | Description |
|---|---|
| **Live Sunday Stream** | YouTube Live embed with real-time viewer count, service countdown, chat overlay |
| **Sermon Library** | Full searchable archive with speaker filter, topic tags, timestamps, notes |
| **Give / Tithe / Donate** | One-time + recurring payments via Stripe. Tithes, general fund, missions, building fund |
| **Prayer Wall** | Submit prayer requests (public/private), community can react + pray for each |
| **Sunday Gallery** | Weekly photo upload by church staff, members can upload, heart, comment |
| **Events Calendar** | Full event management, RSVP, waitlist, calendar sync |

### 🟠 TIER 2 — Community Engine
| Feature | Description |
|---|---|
| **Church Ride Share** | Uber-like matching system — members offer/request rides to church services |
| **Small Groups** | Browse groups, join, see meeting times, group leader dashboard |
| **Volunteer Sign-Up** | Ministry roster, skill-based matching, availability calendar |
| **Church Directory** | Member profiles, searchable, opt-in privacy settings |
| **Announcements** | Push notifications, in-app feed, bulletin board |

### 🟡 TIER 3 — Member Portal
| Feature | Description |
|---|---|
| **Member Profile** | Avatar, giving history, attended events, prayer history, groups |
| **Giving Dashboard** | Annual giving statements, tax-deductible receipts, giving streaks |
| **Devotionals** | Daily verse, weekly devotional, note-taking Bible companion |
| **Milestone Celebrations** | Birthdays, anniversaries, baptism anniversaries pushed to community |

### 🟢 TIER 4 — Admin Dashboard
| Feature | Description |
|---|---|
| **Content Management** | Upload sermons, post announcements, manage events |
| **Financial Reports** | Real-time giving analytics, donor reports, fund breakdowns |
| **Member Management** | Full member database, roles, attendance tracking |
| **Ride Match Admin** | Monitor ride requests, flag issues |
| **Prayer Moderation** | Approve/hide prayer requests before they go public |

---

## 3. Agape International Ministries Platform — Completed

I have successfully updated the application to completely remove the old "Sanctuary Church" branding and replaced all instances with **Agape International Ministries** or **Agape International** (including page locations, mock items, database seeds, and technical routes). 

Additionally, I have completely overhauled all copywriting and metrics across the public pages to remove any "commercial", "salesy", or "fundraising-focused" tones:
- **Tithing & Offerings Focus**: Replaced generic terms like "Give Online" or "Give" in the header, navigation, layout, translations, and buttons with traditional, spiritual terms like **"Tithe & Offering"** and **"Offering Records"**.
- **Spiritual & Community Metrics**: Overhauled the impact statistics on the home page and giving pages. Replaced fundraising numbers (e.g. "$2.4M Given", "847 Monthly Givers", "68% Building Fund Goal") with pastoral, community-oriented metrics:
  - **Gathered Believers**: 1,200+
  - **Outreach Hours**: 4,500+
  - **Home Fellowships**: 32 groups
  - **Global Missions**: 14 supported
  - **Outreach Volunteers**: 250 volunteers
  - **Local Initiatives**: 12 partners
  - **Accountable Stewardship**: 100% of offering spent on ministry & outreach.
- **Copy Polish**: Replaced references to "buying", "stewarding dollars", or "commercial retreat registration" with pastoral guidance centered on grace, welcoming everyone, and spiritual refuge.

The application compiles and builds flawlessly.

---

## 4. TECH STACK (Production-Grade)

```
Frontend:
  Next.js 14 (App Router, Server Components)
  TypeScript (strict mode)
  Tailwind CSS v3
  Framer Motion (component animations)
  GSAP + ScrollTrigger (scroll-driven animations)
  Lenis (buttery smooth scroll)
  shadcn/ui (base UI primitives)
  React Hook Form + Zod (all form validation)

Backend / Database:
  Supabase (PostgreSQL, Auth, Realtime, Storage)
  Prisma ORM (type-safe schema)
  Next.js API Routes + Server Actions

Payments:
  Stripe (one-time + subscriptions + ACH bank transfer)
  Stripe Customer Portal (manage recurring)

Media:
  YouTube Data API v3 + YouTube IFrame API (live stream)
  Cloudinary (photo uploads, transformations)
  Mux (optional: self-hosted sermon video)

Maps / Location:
  Google Maps JavaScript API
  Google Places API
  Custom matching algorithm for ride share

Notifications:
  OneSignal (push notifications)
  Resend (transactional email)

Deployment:
  Vercel (frontend)
  Supabase Cloud (backend)
  Cloudinary (media CDN)
```

---

## 4. DESIGN SYSTEM

### Color Palette
```
--midnight:   #0A0A0F   (deep near-black background)
--sacred:     #C9A84C   (sacred gold — primary brand, CTAs, highlights)
--ivory:      #F8F4ED   (warm white text + light backgrounds)
--violet:     #5B2D8E   (royal purple — secondary accent)
--ember:      #C44B2B   (ember red — alerts, urgency)
--slate:      #1C1C2E   (dark cards, secondary surfaces)
--fog:        #8B8FA8   (muted text, placeholders)
```

### Typography Stack
```
Display:   "Cormorant Garant" — weight 700, used for hero headlines 
           (regal, spiritual, editorial weight)
Heading:   "Playfair Display" — weight 600-700, section titles
Body:      "DM Sans" — weight 400-500, all readable prose
Label/UI:  "Space Grotesk" — weight 500-600, buttons, nav, data
Accent:    "Cinzel" — weight 400, decorative chapter/section markers
```

### Animation Principles
```
Scroll triggers:   GSAP ScrollTrigger, stagger reveals on every section
Page transitions:  Framer Motion layout animations, 0.4s ease
Micro-interactions: Spring physics on hover states
Signature element: Radiant gold "halo" ripple on hero load + 
                   parallax stained-glass light rays in hero background
Smooth scroll:     Lenis, damping 0.1, lerp 0.08
```

---

## 5. PAGE ARCHITECTURE

```
/ (Home)
  ├── Hero — Full-viewport, parallax light rays, live service CTA
  ├── Live Now Widget — YouTube stream status, viewer count, timer
  ├── Quick Actions — Give / Pray / Ride / Watch
  ├── This Sunday — Event card with photo + details
  ├── Latest Sermon — Video card with play preview
  ├── Prayer Wall Preview — 3 public requests with "Pray" button
  ├── Community Photos — Mosaic grid from last Sunday
  └── Footer

/live
  ├── YouTube IFrame embed (full width)
  ├── Sermon notes sidebar
  ├── Live prayer chat
  └── Next service countdown (when offline)

/sermons
  ├── Featured / Latest sermon hero
  ├── Filter by: Speaker, Series, Topic, Date
  └── Video grid with duration, plays, date

/give
  ├── Giving hero (tithe, offering, missions, building fund tabs)
  ├── Amount selector + custom input
  ├── One-time / Weekly / Monthly toggle
  ├── Stripe payment form
  └── Giving impact stats (animated counters)

/events
  ├── Calendar view (monthly)
  ├── Event cards grid
  ├── Event detail → RSVP flow

/community
  ├── Sunday Gallery (infinite scroll, upload modal)
  ├── Member milestones
  └── Small groups grid

/prayer
  ├── Prayer Wall (public requests, filtered)
  ├── Submit Prayer form (public/private/anonymous)
  └── "I Prayed" reactions + prayer count

/ride
  ├── Offer a Ride form (seats, from location, service time)
  ├── Request a Ride form
  ├── Match map (Google Maps)
  └── Matched ride confirmation + contact

/connect
  ├── Small groups browser
  ├── Ministries grid
  └── Volunteer sign-up

/profile
  ├── Member card
  ├── Giving history + statements
  ├── Attended events
  ├── My prayer requests
  └── My groups

/admin (protected)
  ├── Dashboard overview
  ├── Member management
  ├── Content management
  ├── Financial reports
  └── Ride + Prayer moderation
```

---

## 6. DATABASE SCHEMA (Supabase / PostgreSQL)

```sql
-- Auth handled by Supabase Auth (users table auto-created)

profiles (
  id uuid references auth.users primary key,
  full_name text,
  avatar_url text,
  phone text,
  address text,
  member_since date,
  role text default 'member', -- member | admin | pastor | staff
  is_directory_visible boolean default true,
  created_at timestamptz default now()
)

sermons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  speaker text not null,
  series text,
  description text,
  youtube_url text,
  thumbnail_url text,
  duration_seconds int,
  sermon_date date,
  tags text[],
  view_count int default 0,
  created_at timestamptz default now()
)

events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  start_time timestamptz,
  end_time timestamptz,
  cover_image_url text,
  max_attendees int,
  category text, -- service | youth | women | men | community
  is_featured boolean default false,
  created_at timestamptz default now()
)

rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id),
  user_id uuid references profiles(id),
  status text default 'going', -- going | waitlist | cancelled
  created_at timestamptz default now(),
  unique(event_id, user_id)
)

donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  amount_cents int not null,
  fund text not null, -- tithe | offering | missions | building
  frequency text not null, -- one_time | weekly | monthly
  stripe_payment_intent_id text,
  stripe_subscription_id text,
  status text default 'pending', -- pending | succeeded | failed
  created_at timestamptz default now()
)

prayer_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  title text not null,
  body text not null,
  is_public boolean default true,
  is_anonymous boolean default false,
  is_approved boolean default false,
  is_answered boolean default false,
  pray_count int default 0,
  category text, -- healing | provision | guidance | family | other
  created_at timestamptz default now()
)

prayer_reactions (
  id uuid primary key default gen_random_uuid(),
  prayer_id uuid references prayer_requests(id),
  user_id uuid references profiles(id),
  created_at timestamptz default now(),
  unique(prayer_id, user_id)
)

sunday_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  image_url text not null,
  caption text,
  service_date date not null,
  heart_count int default 0,
  is_featured boolean default false,
  is_approved boolean default true,
  created_at timestamptz default now()
)

ride_offers (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid references profiles(id),
  pickup_address text not null,
  pickup_lat float8,
  pickup_lng float8,
  service_time timestamptz not null,
  seats_available int not null default 2,
  seats_remaining int,
  notes text,
  status text default 'open', -- open | full | cancelled
  created_at timestamptz default now()
)

ride_requests (
  id uuid primary key default gen_random_uuid(),
  rider_id uuid references profiles(id),
  offer_id uuid references ride_offers(id),
  pickup_address text,
  status text default 'pending', -- pending | confirmed | cancelled
  created_at timestamptz default now()
)

groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  leader_id uuid references profiles(id),
  category text, -- young-adults | couples | men | women | seniors | youth
  meeting_day text,
  meeting_time text,
  location text,
  max_members int,
  cover_image_url text,
  is_open boolean default true,
  created_at timestamptz default now()
)

group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id),
  user_id uuid references profiles(id),
  role text default 'member',
  joined_at timestamptz default now(),
  unique(group_id, user_id)
)
```

---

## 7. COMPONENT BREAKDOWN

```
/components
  /ui               -- shadcn primitives
  /layout
    Navbar.tsx       -- glass morphism sticky nav
    Footer.tsx       -- rich footer with quick links
    PageTransition.tsx
  /home
    HeroSection.tsx  -- GSAP parallax + Lenis
    LiveWidget.tsx   -- YouTube status + countdown
    QuickActions.tsx -- 4 animated action cards
    SermonPreview.tsx
    PrayerPreview.tsx
    PhotoMosaic.tsx
  /give
    GivingForm.tsx   -- Stripe Elements
    FundSelector.tsx
    FrequencyToggle.tsx
    ImpactCounter.tsx
  /prayer
    PrayerWall.tsx
    PrayerCard.tsx
    SubmitPrayerModal.tsx
    PrayButton.tsx   -- realtime pray count via Supabase
  /ride
    RideMap.tsx      -- Google Maps
    OfferRideForm.tsx
    RequestRideForm.tsx
    MatchCard.tsx
  /live
    YouTubeEmbed.tsx
    LiveChat.tsx
    SermonNotes.tsx
    ServiceCountdown.tsx
  /events
    EventCalendar.tsx
    EventCard.tsx
    RSVPButton.tsx
  /photos
    PhotoGrid.tsx    -- masonry infinite scroll
    PhotoUploadModal.tsx
    PhotoCard.tsx    -- with heart animation
  /admin
    AdminLayout.tsx
    GivingChart.tsx  -- Recharts
    MemberTable.tsx
    ContentEditor.tsx
```

---

## 8. SCROLL ANIMATION BLUEPRINT

```
HERO (GSAP + ScrollTrigger):
  - Background: animated radial gradient pulse on load
  - Light rays: 5 diagonal gold/white ray divs with parallax depth
  - Headline: word-by-word stagger reveal on load (0.06s each)
  - Subtext: fade + translate-y after headline completes
  - CTA buttons: spring scale-in
  - Scroll indicator: bouncing chevron

SECTION TRANSITIONS (ScrollTrigger):
  - Cards: stagger from-bottom fade-in (0.12s stagger)
  - Section headings: horizontal slide-in from left
  - Stats/counters: count-up animation on enter
  - Images: scale from 0.92 → 1.0 + fade on enter
  - Dividers: width reveal left-to-right

GIVING PAGE (Framer Motion):
  - Fund tabs: sliding indicator underline
  - Amount buttons: spring on select
  - Impact numbers: animated odometer count-up
  - Background: slow gradient color shift based on selected fund

PRAYER WALL (Supabase Realtime + Framer Motion):
  - New prayers: slide-in from top with stagger
  - "Prayed" click: heart burst particle animation
  - Pray count: realtime increment with spring bounce

PHOTO GRID:
  - Masonry layout with staggered load
  - Hover: subtle scale + caption reveal overlay
  - Upload: drag-drop zone with animated border pulse
```

---
---
---

# 🤖 AI AGENT PROMPT
## (For Antigravity / Cursor / Any AI Coding Agent)

---

```
=============================================================
SANCTUARY CHURCH APP — FULL BUILD BRIEF
Version: 1.0 | Stack: Next.js 14 + Supabase + Stripe
=============================================================

You are a senior full-stack engineer at a top-tier product 
studio building "Sanctuary" — a premium, production-ready 
church community platform. Think: the Airbnb-level UX quality 
but for a church. Every pixel, every animation, every 
interaction must feel intentional and premium.

DO NOT scaffold generic code. DO NOT use placeholder UI.
Build as if this ships to 5,000 real members on Sunday.

=============================================================
SECTION 1: PROJECT INITIALIZATION
=============================================================

Run the following to initialize the project:

npx create-next-app@latest sanctuary \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd sanctuary

Install ALL dependencies at once:

npm install \
  @supabase/supabase-js @supabase/ssr \
  prisma @prisma/client \
  stripe @stripe/stripe-js @stripe/react-stripe-js \
  framer-motion \
  gsap @gsap/react \
  lenis \
  @radix-ui/react-dialog @radix-ui/react-tabs \
  @radix-ui/react-dropdown-menu @radix-ui/react-select \
  @radix-ui/react-toast @radix-ui/react-avatar \
  @radix-ui/react-switch @radix-ui/react-progress \
  react-hook-form @hookform/resolvers zod \
  react-hot-toast \
  clsx tailwind-merge class-variance-authority \
  lucide-react \
  date-fns \
  recharts \
  react-intersection-observer \
  @google/maps \
  cloudinary \
  resend \
  sharp \
  next-themes

npm install --save-dev @types/google.maps

=============================================================
SECTION 2: ENVIRONMENT VARIABLES
=============================================================

Create .env.local with these variables (user fills values):

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_YOUTUBE_API_KEY=
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000

=============================================================
SECTION 3: DESIGN SYSTEM — IMPLEMENT EXACTLY AS SPECIFIED
=============================================================

3A. TAILWIND CONFIG (tailwind.config.ts):

Extend with this exact design system:

colors: {
  midnight: '#0A0A0F',
  slate: '#1C1C2E',
  sacred: '#C9A84C',
  'sacred-light': '#E8D48A',
  'sacred-dark': '#9A7A30',
  ivory: '#F8F4ED',
  violet: '#5B2D8E',
  'violet-light': '#7B4DB8',
  ember: '#C44B2B',
  fog: '#8B8FA8',
  'surface-1': '#141420',
  'surface-2': '#1E1E32',
  'surface-3': '#28283E',
}

fontFamily: {
  display: ['Cormorant Garant', 'serif'],
  heading: ['Playfair Display', 'serif'],
  body: ['DM Sans', 'sans-serif'],
  label: ['Space Grotesk', 'sans-serif'],
  accent: ['Cinzel', 'serif'],
}

Add these fonts to src/app/layout.tsx via next/font/google:
- Cormorant_Garant (weights: 400, 600, 700)
- Playfair_Display (weights: 400, 600, 700)
- DM_Sans (weights: 300, 400, 500)
- Space_Grotesk (weights: 400, 500, 600)
- Cinzel (weights: 400, 700)

3B. GLOBAL CSS (src/app/globals.css):

Add beyond Tailwind defaults:

:root {
  --gradient-gold: linear-gradient(135deg, #C9A84C 0%, #E8D48A 50%, #C9A84C 100%);
  --gradient-dark: linear-gradient(180deg, #0A0A0F 0%, #1C1C2E 100%);
  --gradient-hero: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%);
  --shadow-gold: 0 0 40px rgba(201,168,76,0.2);
  --shadow-violet: 0 0 40px rgba(91,45,142,0.3);
}

html { scroll-behavior: smooth; }
body { 
  background: #0A0A0F; 
  color: #F8F4ED;
  font-family: 'DM Sans', sans-serif;
}

.gold-text {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass {
  background: rgba(28,28,46,0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(201,168,76,0.15);
}

.ray {
  position: absolute;
  background: linear-gradient(to bottom, rgba(201,168,76,0.08), transparent);
  transform-origin: top center;
  pointer-events: none;
}

=============================================================
SECTION 4: FILE STRUCTURE — CREATE ALL OF THESE
=============================================================

src/
├── app/
│   ├── layout.tsx              (root layout with fonts + providers)
│   ├── page.tsx                (home page)
│   ├── globals.css
│   ├── live/page.tsx
│   ├── sermons/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── give/page.tsx
│   ├── events/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── community/page.tsx
│   ├── prayer/page.tsx
│   ├── ride/page.tsx
│   ├── connect/page.tsx
│   ├── profile/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── members/page.tsx
│   │   ├── content/page.tsx
│   │   ├── giving/page.tsx
│   │   └── moderation/page.tsx
│   └── api/
│       ├── stripe/
│       │   ├── create-payment-intent/route.ts
│       │   ├── create-subscription/route.ts
│       │   └── webhook/route.ts
│       ├── upload/route.ts
│       └── ride/match/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminLayout.tsx
│   │   └── PageTransition.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── LiveWidget.tsx
│   │   ├── QuickActions.tsx
│   │   ├── SermonPreview.tsx
│   │   ├── PrayerPreview.tsx
│   │   ├── PhotoMosaic.tsx
│   │   └── EventsTeaser.tsx
│   ├── give/
│   │   ├── GivingForm.tsx
│   │   ├── FundSelector.tsx
│   │   ├── FrequencyToggle.tsx
│   │   └── ImpactCounter.tsx
│   ├── prayer/
│   │   ├── PrayerWall.tsx
│   │   ├── PrayerCard.tsx
│   │   └── SubmitPrayerModal.tsx
│   ├── live/
│   │   ├── YouTubeEmbed.tsx
│   │   ├── ServiceCountdown.tsx
│   │   └── SermonNotes.tsx
│   ├── ride/
│   │   ├── RideMap.tsx
│   │   ├── OfferRideForm.tsx
│   │   ├── RequestRideForm.tsx
│   │   └── MatchCard.tsx
│   ├── photos/
│   │   ├── PhotoGrid.tsx
│   │   ├── PhotoCard.tsx
│   │   └── PhotoUploadModal.tsx
│   ├── events/
│   │   ├── EventCalendar.tsx
│   │   ├── EventCard.tsx
│   │   └── RSVPButton.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── GoldDivider.tsx
│       ├── SectionHeader.tsx
│       ├── AnimatedCounter.tsx
│       ├── GlassCard.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stripe.ts
│   ├── cloudinary.ts
│   ├── youtube.ts
│   └── utils.ts
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useLiveStream.ts
│   ├── usePrayerRealtime.ts
│   └── useRideMatch.ts
└── types/
    └── index.ts

=============================================================
SECTION 5: NAVBAR — BUILD THIS EXACTLY
=============================================================

File: src/components/layout/Navbar.tsx

Behavior:
- On page load: transparent background
- On scroll past 80px: glass morphism background 
  (backdrop-blur-xl, border-bottom in sacred gold at 20% opacity)
- Logo: "✦ Sanctuary" in Cinzel font, sacred gold color
- Nav links: Home, Live, Sermons, Give, Events, Community, Prayer, Ride
- Each link: DM Sans font, fog color, hover → ivory, 
  with a sacred gold underline that slides in from left on hover
- CTA button: "Join Us" — sacred gold border, 
  gold gradient fill on hover, Space Grotesk font
- Mobile: hamburger that opens a full-screen slide-over menu 
  with staggered link reveals (Framer Motion)
- Add a red pulsing dot next to "Live" when a stream is active
  (check YouTube API on mount)

Implementation: use useEffect + scroll listener for transparency toggle.
Use framer-motion for mobile menu (AnimatePresence + motion.div).

=============================================================
SECTION 6: HERO SECTION — THIS IS THE SIGNATURE MOMENT
=============================================================

File: src/components/home/HeroSection.tsx

This is the most important component. Execute perfectly.

Visual structure:
  - Full viewport height (100svh)
  - Background: #0A0A0F with radial gradient glow from top center
    (rgba(201,168,76,0.12) at center, transparent at edges)
  - 5 light rays: absolutely positioned divs, top-0, 
    each 2px wide, 70vh tall, rotated at different angles 
    (-20deg, -10deg, 0deg, 10deg, 20deg), 
    gold-to-transparent gradient, opacity 0.15, 
    transform-origin top center
    GSAP: animate each ray's opacity 0→0.15 with 0.3s stagger
  - Eyebrow text: "Sundays at 9am & 11am" in Cinzel, 
    sacred gold, letter-spacing: 0.3em, 12px
  - Main headline (H1): 
    Line 1: "Where Faith" (Cormorant Garant, 700, 88px desktop)
    Line 2: "Comes Alive" (Cormorant Garant, 700, 88px, GOLD GRADIENT TEXT)
    Each WORD animates in separately: translateY(40px)→0, opacity 0→1
    Stagger: 0.08s per word using GSAP
  - Subline: "A community built on love, worship, and belonging."
    DM Sans, 20px, fog color, fade-in after headline
  - Two CTAs:
    Primary: "Watch Live" — sacred gold background, midnight text, 
             Space Grotesk 600, hover: scale(1.04), 
             with pulsing red dot if stream is live
    Secondary: "I'm New Here" — transparent, ivory border, 
               ivory text, hover: background white/5
  - Scroll indicator: absolute bottom-8 center,
    "SCROLL" in Cinzel 10px + bouncing chevron (CSS keyframe)

GSAP animation sequence (useGSAP hook):
  1. Light rays: stagger opacity 0→0.15 (delay 0.2s)
  2. Eyebrow: opacity 0→1, y: 20→0 (delay 0.3s)
  3. Each headline word: y: 40→0, opacity 0→1 (stagger 0.08s, delay 0.5s)
  4. Subline: opacity 0→1, y: 20→0 (delay 1.2s)
  5. CTAs: scale 0.95→1, opacity 0→1, stagger 0.1s (delay 1.4s)

=============================================================
SECTION 7: LIVE WIDGET
=============================================================

File: src/components/home/LiveWidget.tsx

When live (stream active):
  - Full-bleed gradient strip: violet → sacred gold
  - Left: red LIVE badge (pulsing) + "We're Worshipping Now"
  - Center: YouTube thumbnail preview (16:9, rounded-xl)
  - Right: "Join Stream →" button + viewer count
  - The entire widget should scale subtly on hover (Framer Motion)

When offline (stream not active):
  - Show "Next Service" countdown timer
  - Days : Hours : Minutes : Seconds boxes
  - Each unit in a glass card with sacred gold digit, 
    Space Grotesk font, size 40px
  - Below: service schedule (Sunday 9AM & 11AM, Wednesday 7PM)

YouTube API check: on mount, call YouTube Data API v3 to check 
if channel has an active liveBroadcast. Cache result 60s.

=============================================================
SECTION 8: GIVE PAGE — STRIPE INTEGRATION
=============================================================

File: src/app/give/page.tsx + src/components/give/GivingForm.tsx

Layout:
  - Page hero: "Give with Generosity" headline, 
    scripture reference below (2 Cor 9:7)
  - Fund selector tabs: Tithe | General Offering | Missions | Building Fund
    Each tab has an icon + description when selected
    Sacred gold sliding underline indicator (Framer Motion layoutId)
  
  - Amount grid: preset amounts ($25, $50, $100, $250, $500)
    + custom input. Selected amount: gold border + gold text.
    Spring animation on select.
  
  - Frequency toggle: One-Time | Weekly | Monthly
    Pill toggle, selected = sacred gold background
  
  - Stripe Elements form:
    Card number, expiry, CVV in custom-styled dark inputs
    Match the app's dark theme via Stripe appearance API:
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#C9A84C',
        colorBackground: '#1C1C2E',
        colorText: '#F8F4ED',
        borderRadius: '12px'
      }
    }
  
  - Submit button: "Give $[amount] [frequency]" — updates dynamically
  
  - Below form: Impact section with animated counters:
    "$2.4M Given This Year" | "847 Members Give Monthly" | 
    "14 Missions Supported" — count-up on scroll enter

API Route: /api/stripe/create-payment-intent
  - For one-time: create PaymentIntent
  - For recurring: create Customer + Subscription via Stripe
  - On success: insert to donations table in Supabase

Stripe Webhook: /api/stripe/webhook
  - Listen for payment_intent.succeeded
  - Update donation status in Supabase
  - Send confirmation email via Resend

=============================================================
SECTION 9: PRAYER WALL — REALTIME
=============================================================

File: src/app/prayer/page.tsx + src/components/prayer/*

Layout:
  - Page header: "The Prayer Wall"
  - Subtext: "Your prayers are heard. We believe together."
  - "Submit a Prayer" button → opens modal
  
  - Filter bar: All | Healing | Provision | Guidance | Family
  
  - Masonry grid of PrayerCard components:
    Each card: glass morphism, 
    - User avatar (or silhouette if anonymous)
    - Category badge (colored by type)
    - Prayer title (bold, ivory)
    - Prayer body (fog color, 3-line clamp)
    - Date (relative: "2 hours ago")
    - "🙏 Pray" button with count
    
  PrayerCard interactions:
    - On "Pray" click: 
      1. Animate button (scale spring)
      2. Show heart-burst particle (5 gold particles radiate out, CSS keyframes)
      3. Increment count via Supabase RPC (atomic increment)
      4. Button becomes "🙏 Prayed" (disabled, gold fill)
    
  REALTIME: Subscribe to prayer_requests table via Supabase Realtime
    - New approved prayers animate in from top (Framer Motion)
    - Prayer count updates live on all connected clients

  SubmitPrayerModal:
    - Title input
    - Prayer body textarea (500 char limit with counter)
    - Category select
    - Toggle: "Make public" / "Keep private" / "Post anonymously"
    - On submit: insert to DB (is_approved=false for new users, 
      true for members with >30 days tenure)

=============================================================
SECTION 10: RIDE SHARE — UBER-LIKE FEATURE
=============================================================

File: src/app/ride/page.tsx + src/components/ride/*

This is the most technically complex feature. Build it fully.

Two-panel layout (desktop), stacked (mobile):
  Left panel: Map (Google Maps)
  Right panel: Tabs (Offer a Ride | Request a Ride | My Matches)

OFFER A RIDE:
  Form fields:
  - Pickup address (Google Places Autocomplete input)
  - Which service (9AM | 11AM | Wednesday 7PM — radio)
  - Date (date picker)
  - Seats available (1-6, stepper)
  - Notes (e.g. "I have a dog-friendly car")
  - Submit → insert to ride_offers table

REQUEST A RIDE:
  Form fields:
  - Your pickup address (Places Autocomplete)
  - Which service
  - Date
  - "Find Rides" button
  On search: query ride_offers where:
    - service_time matches
    - seats_remaining > 0
    - Calculate distance from request address to offer pickup
    - Sort by proximity
  Show list of available rides with:
    - Driver first name + avatar
    - Distance from their location
    - Pickup address
    - Seats left
    - Notes
    - "Request Ride" button

On match confirmed:
  - ride_requests row created (status: pending)
  - Driver gets in-app notification (Supabase Realtime)
  - Driver can confirm/decline via notification
  - On confirm: both parties see each other's phone number
  - MatchCard shows: driver name, pickup time, address confirmation

RIDE MAP:
  - Show all available ride offers as markers on the map
  - Click marker: show offer popup with Request button
  - User's search location: blue dot
  - Polyline from pickup to church location

=============================================================
SECTION 11: SUNDAY PHOTO GALLERY
=============================================================

File: src/app/community/page.tsx + src/components/photos/*

PhotoGrid:
  - Masonry layout using CSS columns (3-col desktop, 2-col tablet, 1-col mobile)
  - Infinite scroll: load 12 photos, load more on scroll to bottom
    (IntersectionObserver on sentinel div)
  - Each PhotoCard:
    - Image: Cloudinary optimized, lazy loaded
    - Hover overlay: username, caption, heart count
    - Heart button with animation on click (Supabase realtime heart_count++)
    - Staggered mount animation (Framer Motion, 0.05s stagger)
  
  - Filter by Sunday date: horizontal scrollable date pills
  
  - "Upload Photo" button (members only):
    Opens PhotoUploadModal:
    - Drag-and-drop zone with dashed animated border
    - File preview after select
    - Caption input
    - Cloudinary upload via /api/upload route
    - On success: optimistically add to grid

CloudinaryUpload (/api/upload/route.ts):
  - Accept multipart form data
  - Upload to Cloudinary with transformation: 
    quality: 80, format: webp, max-width: 1200px
  - Return secure_url
  - Insert to sunday_photos table

=============================================================
SECTION 12: SCROLL ANIMATIONS — IMPLEMENT GLOBALLY
=============================================================

File: src/hooks/useScrollAnimation.ts

Create a reusable hook using IntersectionObserver that:
  - Accepts a ref and animation config
  - Returns isVisible boolean
  - Threshold: 0.15

File: src/components/ui/RevealOnScroll.tsx
  Wrapper component using Framer Motion:
  Props: direction ('up' | 'left' | 'right' | 'fade'), delay, duration
  Default animation: y: 40 → 0, opacity: 0 → 1
  useInView with once: true, margin: "-100px 0px"

Apply RevealOnScroll to:
  - Every section heading
  - Every card grid (with stagger on children)
  - Every stats row
  - Quote blocks
  - Image reveals

LENIS SMOOTH SCROLL:
  Set up Lenis in src/app/layout.tsx inside a LenisProvider component:
  new Lenis({ duration: 1.2, easing: easeInOutCubic, smoothWheel: true })
  Connect to GSAP ticker: gsap.ticker.add(time => lenis.raf(time * 1000))
  
GSAP ScrollTrigger: register in layout, use in individual components.
Always kill ScrollTrigger instances in useEffect cleanup.

=============================================================
SECTION 13: ADMIN DASHBOARD
=============================================================

File: src/app/admin/* (protected, role check on layout)

Admin Layout:
  - Sidebar navigation (fixed left, 240px)
  - Main content area (remaining width)
  - Sidebar links: Overview, Members, Content, Giving, Moderation
  - Sidebar footer: logged-in admin info

Overview Page (Dashboard):
  - 4 KPI cards: Total Members, This Month's Giving, 
    Active Prayer Requests, Events This Month
  - Giving trend chart (Recharts LineChart, last 12 months)
  - Recent activity feed (latest donations, prayer requests, new members)
  - Quick actions: Upload Sermon, Create Event, Post Announcement

Giving Page:
  - Total by fund (donut chart — Recharts)
  - Monthly trend line
  - Top donors table (anonymized by default, toggle to reveal)
  - Export CSV button (generate CSV from Supabase query)

Member Management:
  - Table with search + filter (role, join date, group membership)
  - Row actions: View Profile, Change Role, Send Email
  - Bulk select for announcements

Content Management:
  - Upload sermon form (title, speaker, series, YouTube URL, date, tags)
  - Create event form
  - Post announcement (push notification via OneSignal)

Prayer Moderation:
  - Queue of pending prayer_requests (is_approved = false)
  - Approve / Hide buttons
  - Reason input for hiding

=============================================================
SECTION 14: AUTH FLOW
=============================================================

Use Supabase Auth with SSR (@supabase/ssr).

Pages needed:
  /auth/sign-in — Email + password or Magic Link
  /auth/sign-up — Name, email, password
  /auth/callback — Supabase OAuth callback

Middleware (src/middleware.ts):
  - Protect: /profile, /admin/*, /ride (match), /prayer (submit)
  - Admin-only: /admin/*
  - Public: everything else

After sign-up:
  - Create profile row in profiles table
  - Send welcome email via Resend
  - Redirect to home with welcome toast

=============================================================
SECTION 15: SERMON LIBRARY
=============================================================

File: src/app/sermons/page.tsx

Layout:
  - Featured sermon hero: large YouTube thumbnail, 
    play button overlay, title, speaker, date
  - Filter bar: Series (horizontal scroll pills), 
    Speaker (dropdown), Topic (dropdown), Date (year select)
  - Grid: 3-col cards, each showing thumbnail, title, speaker, 
    duration, date, view count
  - Each card click → /sermons/[id] detail page

Detail page (/sermons/[id]/page.tsx):
  - YouTube embed (16:9, full width, rounded-2xl)
  - Title, speaker, series, date
  - Description / scripture references
  - Related sermons grid (same series or speaker)
  - Note-taking panel: textarea that saves to localStorage 
    with sermon ID as key
  - Share buttons (copy link, WhatsApp, Facebook)

=============================================================
SECTION 16: EVENTS CALENDAR
=============================================================

File: src/app/events/page.tsx

Two views: Grid (default) | Calendar

Grid view:
  - Featured event: wide card with cover image, date overlay
  - Category filters: All | Sunday | Youth | Women | Men | Community
  - Event cards: image, date badge (month/day prominent), 
    title, time, location, RSVP count, CTA

RSVP Flow:
  - If logged in: toggle RSVP (going/not going), shows confirmation
  - If not logged in: prompt to sign in
  - Check max_attendees: if full → show waitlist button
  - Real-time RSVP count via Supabase subscription

Calendar view (bonus):
  - Build a simple month grid (CSS grid, 7 cols)
  - Events as colored dots on dates
  - Click date: show events for that day in side panel

=============================================================
SECTION 17: QUALITY REQUIREMENTS
=============================================================

Performance:
  - All images: next/image with proper sizes prop
  - YouTube embeds: load as iframe only on click (thumbnail first)
    Show poster image with play button, iframe mounts on click
    (prevents layout shift and heavy initial load)
  - Fonts: display: swap
  - Code split by route (Next.js App Router handles this)

Accessibility:
  - All interactive elements: keyboard navigable
  - Focus rings visible (outline: 2px solid sacred gold)
  - Images: meaningful alt text
  - Modals: focus trap, Escape to close
  - Reduced motion: @media (prefers-reduced-motion: reduce) 
    → disable all GSAP / Framer animations

Mobile:
  - All pages: fully responsive, test at 375px, 768px, 1280px
  - Bottom nav bar for mobile (5 key pages: Home, Live, Give, Prayer, Profile)
  - Touch-friendly tap targets: minimum 44x44px
  - Swipe gestures on photo gallery and sermon cards

Error handling:
  - Every API call wrapped in try/catch
  - Toast notifications for all actions (react-hot-toast)
  - Empty states: custom illustrations + helpful copy
  - Loading skeletons on all data-fetching components

=============================================================
SECTION 18: BUILD ORDER (follow this sequence)
=============================================================

Phase 1 — Foundation (do this first):
1. Project init + all deps installed
2. Tailwind config + fonts + CSS variables
3. Supabase client setup (client.ts + server.ts)
4. Database schema: run all CREATE TABLE statements
5. Auth middleware + sign-in/sign-up pages
6. Root layout with Lenis + GSAP setup
7. Navbar component

Phase 2 — Core Pages:
8. HeroSection (most important — spend time here)
9. Home page assembling all sections
10. LiveWidget with YouTube API check
11. Sermon library page
12. Events page
13. Give page with Stripe integration

Phase 3 — Community Features:
14. Prayer wall with Supabase realtime
15. Sunday photo gallery + upload
16. Ride share page + Google Maps

Phase 4 — Member + Admin:
17. Profile page
18. Admin dashboard
19. Admin content management
20. Admin giving reports

Phase 5 — Polish:
21. All scroll animations (GSAP ScrollTrigger)
22. Mobile bottom nav
23. Push notifications setup
24. Email templates via Resend
25. Final responsive QA

=============================================================
SECTION 19: COPY / MICROCOPY GUIDE
=============================================================

Use this real copy throughout — no Lorem ipsum ever:

Church name: "Sanctuary Church"  
Pastor: "Pastor David & Sarah Mitchell"
Location: "123 Grace Boulevard"
Service times: "Sundays 9AM & 11AM | Wednesdays 7PM"
Tagline: "Where your faith lives."
Scripture focus: 2 Corinthians 9:7 (for giving page)
Instagram: "@sanctuarychurch"

Hero subline: "A community rooted in love, worship, and belonging."
Give page headline: "Your Generosity Changes Lives"
Prayer page headline: "Bring Every Burden to the Wall"
Ride page headline: "No One Travels Alone"
Community page headline: "The Family You Didn't Know You Needed"

=============================================================
END OF AGENT BRIEF
=============================================================

Confirm you understand the full scope before starting.
Begin with Phase 1 initialization and work through each section.
Ask for clarification on any section before implementing incorrectly.
Every component should compile without errors before moving to the next.
```

---

## 9. DEPLOYMENT CHECKLIST

- [ ] Supabase project created, schema migrated, RLS policies set
- [ ] Stripe account with webhooks configured
- [ ] YouTube API key with channel ID confirmed
- [ ] Google Maps API key with Maps JS + Places APIs enabled
- [ ] Cloudinary account, upload preset created (unsigned)
- [ ] Vercel project linked to repo, env vars added
- [ ] OneSignal app created, Web Push configured
- [ ] Resend account + domain verified for emails
- [ ] Custom domain connected (e.g. sanctuarychurch.app)
- [ ] Stripe webhook URL set to production domain

---

*Built with intention. Designed with reverence. Shipped with excellence.*
*— Sanctuary v1.0*
