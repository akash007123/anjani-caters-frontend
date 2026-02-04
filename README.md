# Anjani Events - Premium Event Management & Catering Services

## Project Overview

Anjani Events is a premium event management and catering service website built with modern web technologies. The platform showcases catering services, event management solutions, and gallery showcases for various events including weddings, corporate events, religious ceremonies, and more.

## Technologies Used

- **Build Tool:** Vite - Fast and modern build tooling
- **Language:** TypeScript - Type-safe JavaScript
- **Framework:** React - UI component library
- **UI Components:** shadcn/ui - Beautiful, accessible components
- **Styling:** Tailwind CSS - Utility-first CSS framework
- **Animations:** Custom scroll reveal animations
- **SEO:** Enhanced SEO components including LocalSEO, ProgrammaticSEO, EEATSignals
- **Analytics:** Built-in analytics integration

## Project Structure

```
anjani-frontend/
├── public/
│   ├── _redirects          # Netlify redirects
│   ├── favicon.ico         # Site favicon
│   ├── manifest.json       # PWA manifest
│   ├── offline.html        # Offline fallback page
│   ├── og-image.jpg        # Social share image
│   ├── placeholder.svg     # Image placeholder
│   ├── robots.txt          # Search engine rules
│   ├── sitemap.xml         # SEO sitemap
│   └── sw.js               # Service worker
├── src/
│   ├── assets/             # Static assets (images)
│   ├── components/
│   │   ├── analytics/      # Analytics components
│   │   ├── animations/      # Animation components
│   │   ├── cro/            # Conversion rate optimization
│   │   ├── gallery/        # Gallery components
│   │   ├── layout/         # Layout components (Header, Footer, etc.)
│   │   ├── providers/      # Context providers
│   │   ├── seo/            # SEO optimization components
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   ├── App.tsx             # Main app component
│   ├── index.css           # Global styles
│   ├── main.tsx            # Entry point
│   └── serviceWorkerRegistration.ts
├── components.json         # shadcn configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite configuration
└── vitest.config.ts        # Vitest configuration
```

## Pages

- **Home (`/`)** - Landing page with hero section and key services
- **About (`/about`)** - Company information and story
- **Services (`/services`)** - All event management services
- **Catering Services (`/catering` catering page)** - Specialized
- **Event Services (`/events`)** - Event management details
- **Gallery (`/gallery`)** - Event photo gallery
- **Menu (`/menu`)** - Catering menu offerings
- **Booking (`/booking`)** - Event booking form
- **Get Quote (`/quote`)** - Request a quote
- **Contact (`/contact`)** - Contact information
- **Testimonials (`/testimonials`)** - Customer reviews
- **Blogs (`/blogs`)** - Blog listing
- **Blog Post (`/blogs/:slug`)** - Individual blog articles
- **Privacy Policy (`/privacy`)** - Privacy policy
- **Terms & Conditions (`/terms`)** - Terms of service

## Features

### SEO Optimization
- **LocalSEO** - Local business SEO optimization
- **ProgrammaticSEO** - Dynamic SEO for scaled content
- **EEATSignals** - Experience, Expertise, Authoritativeness, Trustworthiness
- **ImageSEO** - Optimized images for search
- **UserEngagement** - Engagement signals for SEO

### Conversion Rate Optimization (CRO)
- **ExitIntentPopup** - Capture leaving visitors
- **LeadMagnet** - Lead generation
- **StickyCTA** - Persistent call-to-action
- **TrustBadges** - Build credibility

### User Experience
- **FloatingWhatsApp** - WhatsApp contact button
- **ThemeToggle** - Light/Dark mode switch
- **GalleryLightbox** - Image lightbox viewer
- **ScrollReveal** - Scroll-based animations
- **Mobile Responsive** - Fully responsive design

### PWA Support
- Service Worker for offline functionality
- Installable as app
- Offline fallback page

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

```sh
# Install dependencies
npm install

# Or using bun
bun install
```

### Development

```sh
# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Production Build

```sh
# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:ui` | Run tests with UI |

## Components

### UI Components (shadcn/ui)
The project uses shadcn/ui for UI components including:
- Button, Card, Dialog, Dropdown Menu
- Form, Input, Calendar, Select
- Toast, Tooltip, Tabs, Table
- And many more...

### Custom Components
- `EnhancedSEO` - Comprehensive SEO wrapper
- `FloatingWhatsApp` - WhatsApp contact button
- `NavLink` - Custom navigation link
- `ScrollReveal` - Scroll animation component
- `GalleryGrid` - Photo gallery grid
- `GalleryLightbox` - Full-screen image viewer
- `ExitIntentPopup` - Exit intent modal
- `LeadMagnet` - Lead capture component
- `StickyCTA` - Sticky call-to-action
- `TrustBadges` - Trust indicators

## Hooks

- `useMobile` - Detect mobile devices
- `useToast` - Toast notifications

## Utilities

- `utils` - Common utility functions

## Configuration Files

- **tailwind.config.ts** - Tailwind CSS theme customization
- **postcss.config.js** - PostCSS plugins
- **eslint.config.js** - ESLint rules
- **tsconfig.json** - TypeScript compiler options
- **vite.config.ts** - Vite bundler configuration
- **components.json** - shadcn/ui component configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.

## Contact

For inquiries about event management and catering services, please contact us through the website.
