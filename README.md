# Customer Registration From

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project is a web application built with Next.js, Prisma, and TailwindCSS. It integrates Google Maps and provides a modular architecture for scalability and maintainability.

### Key Features
- **Frontend**: Built with Next.js and React, featuring reusable components.
- **Backend**: RESTful API structure with Prisma ORM for database interactions.
- **Database**: PostgreSQL database managed via Prisma.
- **Styling**: TailwindCSS for modern and responsive design.
- **Validation**: `zod` for schema validation.
- **Authentication**: Password hashing with `bcrypt`.
- **Google Maps Integration**: Powered by `@react-google-maps/api`.
- **State Management**: Context API for managing global state.
- **Forms**: `react-hook-form` for form handling and validation.

## Project Structure

```
prisma/
  schema.prisma       # Database schema
  migrations/         # Database migrations
src/
  app/
    api/              # API routes
    globals.css       # Global styles
    page.tsx          # Main entry point
  components/         # Reusable UI components
  config/             # Configuration files
  context/            # Context API for state management
  services/           # Utility functions and services
  types/              # TypeScript type definitions
  validations/        # Validation schemas
```

## Environment Variables

The following environment variables are required to run the project:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/Assignment?schema=public"
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
```

## Application Flow

### Routes
- The API routes are defined under `src/app/api/v1/customer/register/route.ts`.
- These routes handle customer registration, including validation and database interactions.

### Components
- Reusable components like `Button`, `Input`, `LoadingBar`, `Map`, `Section`, and `Toast` are located in `src/components/`.
- These components are used across the application to maintain consistency and modularity.

### Map Integration
- Google Maps is integrated using the `@react-google-maps/api` library.
- The `Map` component in `src/components/Map.tsx` is responsible for rendering the map and handling location-based features.

### Database Schema
- The database schema is defined in `prisma/schema.prisma`.
- The `Customer` model includes fields like `id`, `fullName`, `email`, `phone`, `gender`, `dob`, `address`, `password`, `lat`, `lng`, `browserInfo`, and `createdAt`.
- Prisma is used to interact with the database, ensuring type safety and ease of use.


## Getting Started

### Prerequisites
- Next.js
- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anurag150304/Customer-Registration-From.git
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the database:
   ```bash
   pnpm prisma migrate dev
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run ESLint to lint the code.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)

## License

This project is licensed under the MIT License.
