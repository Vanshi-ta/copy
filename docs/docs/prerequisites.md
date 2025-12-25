---
sidebar_position: 2
---

# Prerequisites

Before you begin contributing to **Move**, ensure you have the following tools installed and understand the core technologies.

## System Requirements

### 1. Version Control: Git

- **Why**: To manage source code history and collaboration.
- **Requirement**: Git installed and configured.
- **Check**: `git --version`

### 2. Runtime: Node.js

- **Why**: To run the JavaScript/TypeScript environment for both Web and Backend.
- **Requirement**: Node.js v20 (LTS) or higher.
- **Check**: `node -v`
- **Manager**: We recommend using `nvm` (Node Version Manager) or `fnm` to manage versions.

### 3. Package Manager: npm

- **Why**: To install dependencies.
- **Requirement**: Comes bundled with Node.js.

## Technology Stack Overview

### 🎨 Frontend (Web)

- **[Next.js 16](https://nextjs.org/)**: The React framework for the web. We use the **App Router** for routing and layouts.
- **[React 19](https://react.dev/)**: Library for building user interfaces.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Tiptap](https://tiptap.dev/)**: Headless wrapper for ProseMirror, used for our rich text blog editor.

### ⚙️ Backend (API)

- **[Express.js](https://expressjs.com/)**: Minimal and flexible Node.js web application framework.
- **[TypeScript](https://www.typescriptlang.org/)**: Adds static types to JavaScript, used throughout the monorepo.

### 🗄️ Database & Auth

- **[Prisma](https://www.prisma.io/)**: Next-generation Node.js and TypeScript ORM. We use it to interact with our PostgreSQL database.
- **[PostgreSQL](https://www.postgresql.org/)**: The primary relational database.
- **[Clerk](https://clerk.com/)**: Complete user management and authentication solution.

### 📱 Mobile

- **React Native / Expo**: Used for the mobile application (in the separate `move` repository).
