---
sidebar_position: 4
---

# Backend API

The backend is an **Express.js** service that powers the "Move" platform. It primarily handles user synchronization and data persistence.

## 🔌 API Endpoints

### Authentication & User

- **`POST /api/user`** (Signin/Sync)
  - **Logic**: Receives `userId`. Fetches user details from Clerk. Checks if user exists in local PostgreSQL. If not, creates a new `User` record.
  - **Usage**: Called by frontend after Clerk sign-in to ensure DB consistency.
- **`GET /protected`**
  - **Logic**: Example restricted route using `clerkMiddleware`. Returns authenticated user details.

### System

- **`GET /`**
  - **Logic**: Health check / Welcome message ("register now!").

## Ongoing Features Support

1.  **Blog API**: Manages posts, categories, and author data.
2.  **Booking API**: Handles booking requests, pricing calculations, and mover matching (In progress).

## Database Schema (Prisma)

The database is managed via Prisma. Here is the core schema structure:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
  category  String  @default("General")
  imageUrl  String?
  views     Int     @default(0)
  readTime  Int?
  rating    Int?
}
```

## Tech Stack

- Express.js
- TypeScript
- Prisma (PostgreSQL)
- Clerk Auth

## Key Commands

- `npm run dev`: Start dev server (Port variable)
- `npm run start`: Production start
