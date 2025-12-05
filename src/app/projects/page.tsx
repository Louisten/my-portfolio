"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/public/ProjectsGrid";
import { useEffect, useState } from "react";

interface Settings {
    name: string;
}

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    tags: string[];
    published: boolean;
}

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [settings, setSettings] = useState<Settings>({ name: "Your Name" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/projects").then(res => res.json()),
            fetch("/api/settings").then(res => res.json())
        ]).then(([projectsData, settingsData]) => {
            if (projectsData.success) setProjects(projectsData.data || []);
            if (settingsData.success) setSettings(settingsData.data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-float-slow animate-pulse-glow" />
                <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-3xl animate-float-medium animate-pulse-glow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-float-fast" style={{ animationDelay: '1s' }} />
            </div>

            {/* Navigation */}
            <motion.header
                className="relative z-50 glass border-b border-white/10"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-6">
                    <Link href="/" className="text-2xl font-bold gradient-text">
                        {settings.name}
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/projects" className="text-sm font-medium text-white border-b-2 border-purple-500 pb-1">
                            Projects
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Blog
                        </Link>
                        <Button asChild className="gradient-button">
                            <Link href="/">Home</Link>
                        </Button>
                    </nav>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="relative z-10 flex-1">
                <div className="container mx-auto px-6 py-16">
                    {/* Hero Section */}
                    <motion.div
                        className="mb-16 text-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block glass-subtle px-6 py-2 rounded-full mb-6"
                            variants={fadeIn}
                        >
                            <span className="text-sm text-slate-300">🚀 My Work</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-text">Projects</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Explore my latest work and side projects. Each project represents a unique challenge and creative solution.
                        </p>
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {isLoading ? (
                            <div className="text-center py-20">
                                <div className="glass-card inline-block px-8 py-4 rounded-2xl">
                                    <span className="text-slate-400">Loading projects...</span>
                                </div>
                            </div>
                        ) : (
                            <ProjectsGrid projects={projects} />
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <motion.footer
                className="relative z-10 glass border-t border-white/10 py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-6 text-center">
                    <p className="text-slate-500 text-sm">
                        © 2025 {settings.name}. All rights reserved.
                    </p>
                </div>
            </motion.footer>
        </div>
    );
}
