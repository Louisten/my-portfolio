---
description: 
---

# Deployment Guide: Vercel + Neon

// turbo-all

## Prerequisites
- GitHub account
- Your portfolio code pushed to a GitHub repository

---

## Step 1: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up (free)
2. Click **"Create Project"**
3. Name it: `portfolio-db`
4. Select region closest to you
5. Click **"Create Project"**
6. Copy the **Connection String** (looks like):
   ```
   postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

> [!IMPORTANT]  
> Save this connection string - you'll need it for Vercel!

---

## Step 2: Push Code to GitHub

```bash
# Initialize git (if not done)
cd /Users/63942/Documents/projects/portofolio
git init

# Add all files
git add .

# Commit
git commit -m "Portfolio ready for deployment"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your portfolio repository
4. **Configure Environment Variables** (click "Environment Variables"):

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon connection string |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` (update after first deploy) |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` |

5. Click **"Deploy"**

---

## Step 4: Run Database Migration

After Vercel deploys, run this locally to push your schema to Neon:

```bash
DATABASE_URL="your-neon-connection-string" npx prisma db push
```

---

## Step 5: Create Admin User

```bash
DATABASE_URL="your-neon-connection-string" npx prisma db seed
```

Or manually insert via Neon SQL Editor:
```sql
INSERT INTO users (id, email, password, name)
VALUES (
  'admin-user',
  'your-email@example.com',
  '$2a$10$... (hashed password)',
  'Admin'
);
```

---

## Step 6: Update NEXTAUTH_URL

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXTAUTH_URL` to your actual deployed URL (e.g., `https://portfolio-abc123.vercel.app`)
3. Redeploy: Go to "Deployments" tab → click "..." on latest → "Redeploy"

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection error | Check DATABASE_URL has `?sslmode=require` |
| Auth not working | Verify NEXTAUTH_URL matches your domain |
| Prisma errors | Run `npx prisma generate` before deploying |

---

## Quick Commands Reference

```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
DATABASE_URL="your-neon-url" npx prisma db push

# Seed database
DATABASE_URL="your-neon-url" npx prisma db seed

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```
