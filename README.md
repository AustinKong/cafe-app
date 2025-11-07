# Cafe App

A full-stack application for managing cafes and their employees. Built with React (frontend), Express.js (backend), and PostgreSQL (database) using Prisma ORM.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- PostgreSQL (local installation or cloud service like Neon, Supabase)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AustinKong/cafe-app.git
   cd cafe-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   
3. Build shared types:
   ```bash
   cd packages/shared-types
   npm run build
   ```

   This will install and build dependencies for the root workspace and all sub-workspaces (backend, frontend, packages/shared-types).

## Environment Setup

### Backend Environment Variables

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and fill in the required values:
   - `DATABASE_URL`: Your PostgreSQL connection string (e.g., `postgresql://username:password@localhost:5432/cafe_app?schema=public`)
   - `PORT`: Port for the backend server (default: 5000)
   - `DATA_PATH`: Path to store uploaded data (default: `./data`)
   - `FRONTEND_URL`: URL of the frontend application (default: `http://localhost:5173`)

## Database Setup

1. Ensure PostgreSQL is running and accessible.

2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

4. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

5. (Optional) Seed the database with initial data:
   ```bash
   npm run prisma:seed
   ```

## Running the Application

From the root directory, start both backend and frontend in development mode:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:5173`


## Project Structure

- `backend/`: Express.js API server with Prisma ORM
- `frontend/`: React application with Vite
- `packages/shared-types/`: Shared TypeScript types and schemas

## Architectural choices and explanations

This project was implemented to satisfy the assessment requirements while keeping the codebase small, testable, and easy to understand. Below are notes about some of the design choices and why certain advanced patterns (CQRS, Mediator, Autofac) were not used here.

### Why I didn't use CQRS and the Mediator pattern

- CQRS and Mediator are useful when you have a complex domain with many read/write concerns, expensive queries, or when you need to scale read/write responsibilities separately. They also help centralise cross-cutting concerns via a mediator pipeline (logging, validation, retries, etc.).
- This assessment's domain (cafes and employees) is relatively small and CRUD-focused. I chose a more conventional controller -> service pattern which:
   - Keeps endpoints simple and explicit (controllers handle HTTP concerns, services contain business logic and DB access).
   - Is easy to test: controllers and services can be unit-tested independently by passing mocks.
   - Avoids adding extra layers and boilerplate which would increase complexity without delivering much benefit for this scope.

### Why I didn't use Autofac

- Autofac is a powerful DI container for .NET. This project is implemented in Node.js/TypeScript, so Autofac is not applicable.
- For dependency injection in the Express/TypeScript ecosystem I used Inversify. Inversify:
   - Provides decorator-based injection (`@injectable`, `@inject`) similar to Autofac's style.
   - Works well with TypeScript `emitDecoratorMetadata` to resolve class-based dependencies.
   - Keeps the container configuration explicit in `backend/src/container.ts`.

### What I used instead (practical summary)

- Layered controller -> service architecture:
   - Controllers: handle request/response, validation errors, and mapping to DTOs.
   - Services: implement business logic and Prisma DB access. Interfaces (`ICafeService`, `IEmployeeService`) make mocking and testing easier.
- Dependency Injection: Inversify with a central `container.ts`. I bind interfaces to implementations and inject the Prisma client as a singleton.
- Validation: Zod schemas (shared via `packages/shared-types`) are used for request validation with a `validateRequest` middleware. This keeps validation declarative and shared between frontend and backend types.
- Prisma ORM: schema-driven database model with migrations and seeding. DB-level `onDelete: Cascade` ensures deleting a cafe removes related employees.
- Routing pattern: I used explicit router factories (`createCafeRouter(controller)`) and pass controller instances in `app.ts`. This keeps routes testable and decoupled from the DI container.
