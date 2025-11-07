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

   This will install dependencies for the root workspace and all sub-workspaces (backend, frontend, packages/shared-types).

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

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Project Structure

- `backend/`: Express.js API server with Prisma ORM
- `frontend/`: React application with Vite
- `packages/shared-types/`: Shared TypeScript types and schemas
