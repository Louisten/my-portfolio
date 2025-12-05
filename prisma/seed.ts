import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@portfolio.com" },
        update: {},
        create: {
            email: "admin@portfolio.com",
            name: "Admin User",
            password: hashedPassword,
        },
    });

    console.log("✅ Admin user created:", admin.email);

    // Create default settings
    const settings = await prisma.settings.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            name: "Your Name",
            tagline: "Full Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications and experiences.",
            bio: "I'm a passionate developer who loves building amazing web applications. This portfolio showcases my work in full-stack development, focusing on modern technologies like Next.js, React, and TypeScript.",
            email: "hello@example.com",
            location: "San Francisco, CA",
        },
    });

    console.log("✅ Settings created:", settings.name);

    // Create sample projects
    const projects = [
        {
            title: "E-Commerce Platform",
            slug: "ecommerce-platform",
            description: "A full-featured e-commerce platform built with Next.js, featuring real-time inventory, Stripe payments, and admin dashboard.",
            coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
            tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind CSS"],
            demoUrl: "https://example.com/demo",
            repoUrl: "https://github.com/username/ecommerce",
            featured: true,
            published: true,
            publishedAt: new Date(),
            order: 1,
        },
        {
            title: "Task Management App",
            slug: "task-management-app",
            description: "A Kanban-style task management application with drag-and-drop, real-time collaboration, and team workspaces.",
            coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
            tags: ["React", "Node.js", "Socket.io", "MongoDB"],
            demoUrl: "https://example.com/tasks",
            repoUrl: "https://github.com/username/taskapp",
            featured: true,
            published: true,
            publishedAt: new Date(),
            order: 2,
        },
        {
            title: "AI Chat Assistant",
            slug: "ai-chat-assistant",
            description: "An intelligent chat assistant powered by OpenAI GPT-4, featuring conversation history, custom personas, and markdown rendering.",
            coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            tags: ["Python", "FastAPI", "OpenAI", "React", "WebSocket"],
            demoUrl: "https://example.com/chat",
            repoUrl: "https://github.com/username/ai-chat",
            featured: false,
            published: true,
            publishedAt: new Date(),
            order: 3,
        },
    ];

    for (const project of projects) {
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: {},
            create: project,
        });
    }

    console.log(`✅ Created ${projects.length} sample projects`);

    // Create sample experiences
    const experiences = [
        {
            type: "work",
            title: "Senior Full Stack Developer",
            company: "Tech Company Inc.",
            location: "San Francisco, CA (Remote)",
            description: "Led development of multiple client projects using Next.js and React. Mentored junior developers and established coding standards.",
            skills: ["Next.js", "React", "TypeScript", "PostgreSQL", "AWS"],
            startDate: new Date("2022-01-01"),
            current: true,
            order: 1,
        },
        {
            type: "work",
            title: "Full Stack Developer",
            company: "Startup Labs",
            location: "New York, NY",
            description: "Built and maintained SaaS applications serving 10,000+ users. Implemented CI/CD pipelines and automated testing.",
            skills: ["React", "Node.js", "MongoDB", "Docker", "GitHub Actions"],
            startDate: new Date("2020-03-01"),
            endDate: new Date("2021-12-31"),
            current: false,
            order: 2,
        },
        {
            type: "education",
            title: "Bachelor of Science in Computer Science",
            company: "University of Technology",
            location: "Boston, MA",
            description: "Graduated with honors. Focus on software engineering and machine learning.",
            skills: ["Algorithms", "Data Structures", "Machine Learning", "Software Engineering"],
            startDate: new Date("2016-09-01"),
            endDate: new Date("2020-05-31"),
            current: false,
            order: 3,
        },
    ];

    for (const experience of experiences) {
        await prisma.experience.create({
            data: experience,
        });
    }

    console.log(`✅ Created ${experiences.length} sample experiences`);

    console.log("\n🎉 Seed completed successfully!");
    console.log("\n📧 Admin login credentials:");
    console.log("   Email: admin@portfolio.com");
    console.log("   Password: admin123");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
