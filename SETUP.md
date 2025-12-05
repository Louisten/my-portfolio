# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

Due to npm cache issues, you may need to run:

```bash
# If you encounter npm cache errors, run this first:
npm cache clean --force

# Then install dependencies:
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:

```env
# Database - update with your PostgreSQL credentials
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db?schema=public"

# Auth - generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Uploadthing (optional, for image uploads)
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

### 3. Set Up Database

```bash
# Create your database (if not exists)
createdb portfolio_db

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Create Admin User

```bash
# Open Prisma Studio
npx prisma studio
```

In Prisma Studio:
1. Click on "User" model
2. Click "Add record"
3. Fill in:
   - **email**: `admin@example.com`
   - **name**: `Admin User`
   - **password**: Use this command to generate hash:
     ```bash
     node -e "console.log(require('bcryptjs').hashSync('yourpassword', 10))"
     ```
4. Save the record

### 5. Run Development Server

```bash
npm run dev
```

Visit:
- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin

### 6. Login

Use the credentials you created:
- Email: `admin@example.com`
- Password: `yourpassword`

## Common Issues

### npm cache error
Run: `npm cache clean --force` then `npm install`

### Prisma Client not found
Run: `npx prisma generate`

### Database connection error
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env.local
- Ensure database exists: `createdb portfolio_db`

### Cannot login
- Verify admin user exists in database (check with Prisma Studio)
- Ensure password is correctly hashed
- Check NEXTAUTH_SECRET is set in .env.local

## Next Steps

Once logged in, you can:
1. Create your first project at `/admin/projects/new`
2. Customize the homepage content
3. Add your experience and blog posts (coming soon)
4. Deploy to Vercel or your preferred platform

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma db push   # Push schema changes
```

Enjoy building your portfolio! 🚀
