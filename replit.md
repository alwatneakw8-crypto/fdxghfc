# Dukhoon Perfume Store

## Overview

Dukhoon (دخون) is an Arabic-language e-commerce web application for a luxury perfume store. The application showcases premium Arabian and international fragrances, oud, incense, and aromatic products. It features a modern, RTL (right-to-left) responsive design with product browsing, category filtering, and shopping cart functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state, React useState for local state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Shadcn/ui component library (New York style) with Radix UI primitives
- **Build Tool**: Vite with HMR support

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Feature components in `client/src/components/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Framework**: Express.js 5 with TypeScript
- **API Pattern**: RESTful JSON API
- **Server**: Node.js with HTTP server

The backend serves:
- Static files in production
- API endpoints under `/api/` prefix
- Vite dev server middleware in development

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table definitions
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: In-memory storage implementation (`MemStorage` class) with sample seed data
- **Database Ready**: Schema configured for PostgreSQL with `DATABASE_URL` environment variable

### Key Design Decisions

1. **Shared Types**: The `shared/` directory contains schema definitions used by both frontend and backend, ensuring type safety across the stack.

2. **RTL Support**: The application is designed for Arabic with `dir="rtl"` and `lang="ar"` set on the HTML element, with appropriate font loading.

3. **Component Library**: Shadcn/ui provides consistent, accessible UI components with customizable theming through CSS variables defined in `client/src/index.css`.

4. **API Design**: Simple REST endpoints for products with category filtering support. The storage layer is abstracted via an `IStorage` interface for easy database migration.

## External Dependencies

### Database
- **PostgreSQL**: Required for production (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations stored in `/migrations`

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **Embla Carousel**: Touch-friendly carousel component
- **react-day-picker**: Date picker functionality
- **Lucide React**: Icon library
- **react-icons**: Additional social media icons

### Backend Libraries
- **express-session**: Session management (with connect-pg-simple for PostgreSQL session storage)
- **multer**: File upload handling
- **passport/passport-local**: Authentication framework

### Build & Development
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner