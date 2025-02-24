# @kerimtdev/starter-kit

A modern Next.js application featuring multi-tenant workspaces, secure file handling with S3, type-safe API layer using tRPC, and efficient database management with Drizzle ORM.


### Core Technologies
- Next.js 15+ with App Router and TypeScript
- tRPC for end-to-end type-safe APIs
- Drizzle ORM for database operations 
- AWS S3 for file storage
- TanStack Query for data fetching
- Zustand for state management
- Valibot for schema validation


### Project Structure

```
├── api/             # tRPC API routes and procedures
├── app/             # Next.js app directory
├── components/      # React components
├── database/        # Drizzle schemas and migrations
├── hooks/           # Custom React hooks
├── providers/       # React provider components
├── stores/          # Zustand state stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Getting Started 

1. Clone and install dependencies:

```
git clone https://github.com/kerimtdev/starter-kit.git
cd starter-kit
bun install
```

2. Configure environment variables and update with your credentials: 

```
cp .env.example .env
```

3. Initialize the database:

```
bun db:generate
bun db:push
```