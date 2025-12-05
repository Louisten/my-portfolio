"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Settings {
    name: string;
    bio?: string | null;
    location?: string | null;
    email?: string | null;
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
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

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

export default function AboutPage() {
    const [settings, setSettings] = useState<Settings>({ name: "Your Name", bio: "Loading..." });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/settings").then(res => res.json()).then(data => {
            if (data.success) setSettings(data.data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-3xl animate-float-slow animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/3 w-[550px] h-[550px] bg-purple-500/25 rounded-full blur-3xl animate-float-medium animate-pulse-glow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-float-fast" style={{ animationDelay: '1s' }} />
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
                        <Link href="/projects" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Projects
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-white border-b-2 border-purple-500 pb-1">
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
                        className="mb-12 text-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block glass-subtle px-6 py-2 rounded-full mb-6"
                            variants={fadeIn}
                        >
                            <span className="text-sm text-slate-300">👋 Get to know me</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            About <span className="gradient-text">Me</span>
                        </h1>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div
                        className="max-w-3xl mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass-card p-8 md:p-12 rounded-3xl">
                            {isLoading ? (
                                <div className="text-center py-8">
                                    <span className="text-slate-400">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <motion.h2
                                        className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
                                        variants={fadeIn}
                                    >
                                        {settings.name}
                                    </motion.h2>

                                    {settings.location && (
                                        <motion.div
                                            className="flex items-center gap-2 mb-6"
                                            variants={fadeIn}
                                        >
                                            <span className="text-xl">📍</span>
                                            <span className="text-slate-400">{settings.location}</span>
                                        </motion.div>
                                    )}

                                    <motion.div
                                        className="prose prose-invert max-w-none"
                                        variants={fadeIn}
                                    >
                                        <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {settings.bio || "No bio available yet."}
                                        </p>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Connect Section */}
                    {(settings.email || settings.github || settings.linkedin || settings.twitter) && (
                        <motion.div
                            className="max-w-3xl mx-auto mt-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="glass-card p-8 md:p-12 rounded-3xl text-center">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                                    Let's <span className="gradient-text">Connect</span>
                                </h2>
                                <p className="text-slate-400 mb-8">
                                    Feel free to reach out through any of these platforms
                                </p>
                                <motion.div
                                    className="flex flex-wrap justify-center gap-4"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {settings.email && (
                                        <motion.div variants={scaleIn}>
                                            <Button asChild className="gradient-button px-6 py-5 rounded-xl">
                                                <a href={`mailto:${settings.email}`}>
                                                    ✉️ Email
                                                </a>
                                            </Button>
                                        </motion.div>
                                    )}
                                    {settings.github && (
                                        <motion.div variants={scaleIn}>
                                            <Button asChild className="glass-button px-6 py-5 rounded-xl">
                                                <a href={settings.github} target="_blank" rel="noopener noreferrer">
                                                    🐙 GitHub
                                                </a>
                                            </Button>
                                        </motion.div>
                                    )}
                                    {settings.linkedin && (
                                        <motion.div variants={scaleIn}>
                                            <Button asChild className="glass-button px-6 py-5 rounded-xl">
                                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer">
                                                    💼 LinkedIn
                                                </a>
                                            </Button>
                                        </motion.div>
                                    )}
                                    {settings.twitter && (
                                        <motion.div variants={scaleIn}>
                                            <Button asChild className="glass-button px-6 py-5 rounded-xl">
                                                <a href={settings.twitter} target="_blank" rel="noopener noreferrer">
                                                    🐦 Twitter/X
                                                </a>
                                            </Button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <motion.footer
                className="relative z-10 glass border-t border-white/10 py-12 mt-16"
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
