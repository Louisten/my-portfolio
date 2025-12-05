# Portfolio Website with CMS

A modern, full-stack portfolio website with an integrated admin dashboard for managing content. Built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

- **Public Portfolio**: Beautiful, responsive portfolio showcasing projects, experience, and blog posts
- **Admin Dashboard**: Full-featured CMS to manage all content
- **Authentication**: Secure admin access with Auth.js
- **Database**: PostgreSQL with Prisma ORM
- **Type-Safe**: Full TypeScript coverage with Zod validation
- **Modern Stack**: Next.js 15 with App Router and Server Actions

## 📁 Project Structure

```
portofolio/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js app router
│   │   ├── admin/            # Admin dashboard pages
│   │   ├── projects/         # Public project pages
│   │   └── api/auth/         # Auth.js API routes
│   ├── components/
│   │   ├── ui/               # Shadcn UI components
│   │   ├── admin/            # Admin components
│   │   └── public/           # Public components
│   ├── lib/                  # Core libraries
│   ├── actions/              # Server actions
│   └── schemas/              # Zod validation schemas
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

First, fix the npm cache issue (if needed) and install dependencies:

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables

Copy the example environment file and update with your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Update `.env.local` with your configuration:

\`\`\`env
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 3. Set Up PostgreSQL Database

Make sure you have PostgreSQL installed and running. Create a database:

\`\`\`bash
createdb portfolio_db
\`\`\`

### 4. Initialize Prisma

Generate Prisma client and run migrations:

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 5. Create Admin User

You'll need to create an admin user. You can do this via Prisma Studio:

\`\`\`bash
npx prisma studio
\`\`\`

Or create a seed script. Here's a quick way to hash a password:

\`\`\`javascript
// seeds/create-admin.js
const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('your-password', 10);
console.log(password);
\`\`\`

Then manually insert the user in Prisma Studio with:
- Email: your-email@example.com
- Password: [the hashed password]
- Name: Your Name

### 6. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- **Public Site**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin

## 📝 Key Deliverables (As Requested)

### ✅ 1. Prisma Schema
Located at: `prisma/schema.prisma`

Includes models for:
- User (authentication)
- Project (with title, description, coverImage, tags, demoUrl, repoUrl)
- Experience
- BlogPost

### ✅ 2. Server Action Example
Located at: `src/actions/projects.ts`

The `createProject` function handles:
- Data validation with Zod
- Slug uniqueness checking
- Database insertion
- Cache revalidation

### ✅ 3. Admin Form (`/admin/projects/new`)
Located at: `src/app/admin/projects/new/page.tsx` and `src/components/admin/ProjectForm.tsx`

Features:
- React Hook Form with Zod validation
- Auto-slug generation from title
- Tag management (add/remove)
- Rich form with all project fields
- Error handling and loading states

### ✅ 4. Public Projects Grid
Located at: `src/components/public/ProjectsGrid.tsx` and `src/app/projects/page.tsx`

Features:
- Server component fetching published projects
- Responsive grid layout
- ISR with 1-hour revalidation
- Empty state handling

## 🔑 Admin Access

After setup, log in at `/login` with your admin credentials to:
- Create, edit, and delete projects
- Manage project publishing status
- Set featured projects
- Organize project order
- View dashboard statistics

## 🎨 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: Auth.js (NextAuth v5)
- **Validation**: Zod
- **Forms**: React Hook Form

## 📚 Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes to database
npm run db:migrate   # Create a new migration
npm run db:studio    # Open Prisma Studio
\`\`\`

## 🔒 Security Notes

1. Never commit `.env.local` to version control
2. Use a strong `NEXTAUTH_SECRET` in production
3. Hash all passwords before storing (handled automatically)
4. Admin routes are protected by middleware

## 🚢 Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

For database, consider using:
- Vercel Postgres
- Supabase
- Railway
- Neon

## 📖 Next Steps

1. Install dependencies: `npm install`
2. Set up your database and environment variables
3. Run migrations: `npx prisma db push`
4. Create an admin user
5. Start developing: `npm run dev`

## 🤝 Support

For questions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth.js Documentation](https://authjs.dev)
