"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Settings {
    name: string;
    tagline: string;
    techStack: string[];
    email?: string | null;
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
}

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    tags: string[];
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

export default function HomePage() {
    const [settings, setSettings] = useState<Settings>({ name: "Your Name", tagline: "", techStack: [] });
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/api/settings", { cache: "no-store" }).then(res => res.json()).then(data => {
            if (data.success && data.data) {
                setSettings({
                    ...data.data,
                    techStack: data.data.techStack || []
                });
            }
        }).catch(() => { });

        fetch("/api/projects").then(res => res.json()).then(data => {
            if (data.success) setProjects(data.data?.slice(0, 3) || []);
        }).catch(() => { });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-float-slow animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-3xl animate-float-medium animate-pulse-glow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-float-fast" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '3s' }} />
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
                        <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Blog
                        </Link>
                        <Button asChild className="gradient-button">
                            <Link href={settings.email ? `mailto:${settings.email}` : "/contact"}>Contact</Link>
                        </Button>
                    </nav>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="relative z-10 container mx-auto px-6 py-32 md:py-48">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        className="inline-block glass-subtle px-6 py-2 rounded-full mb-8"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm text-slate-300">✨ Welcome to my portfolio</span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Hi, I'm{" "}
                        <span className="gradient-text">
                            {settings.name}
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {settings.tagline || "Full Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications and experiences."}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Button asChild size="lg" className="gradient-button text-lg px-8 py-6 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                            <Link href="/projects">View My Work</Link>
                        </Button>
                        <Button asChild size="lg" className="glass-button text-lg px-8 py-6 rounded-xl">
                            <Link href="/about">About Me</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="relative z-10 py-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="glass-card p-12 rounded-3xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
                            <p className="text-slate-400 max-w-xl mx-auto">Technologies I work with to bring ideas to life</p>
                        </div>
                        <motion.div
                            className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto text-center"
                            variants={staggerContainer}
                        >
                            {(settings.techStack.length > 0 ? settings.techStack : ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "GraphQL"]).map((tech) => (
                                <motion.div
                                    key={tech}
                                    className="px-6 py-3 rounded-full glass-button cursor-default glass-shimmer"
                                    variants={scaleIn}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.5)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-sm font-medium text-slate-300">{tech}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {projects.length > 0 && (
                <section className="relative z-10 py-24">
                    <div className="container mx-auto px-6">
                        <motion.div
                            className="flex justify-between items-end mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                                <p className="text-slate-400 max-w-xl">A selection of my recent work</p>
                            </div>
                            <Button asChild variant="ghost" className="text-slate-300 hover:text-white glass-button rounded-full px-6">
                                <Link href="/projects">View All →</Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                        >
                            {projects.map((project) => (
                                <motion.div key={project.id} variants={fadeInUp}>
                                    <Link href={`/projects/${project.slug}`}>
                                        <div className="glass-card overflow-hidden group h-full">
                                            <motion.div
                                                className="aspect-video relative overflow-hidden"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                                    style={{ backgroundImage: `url(${project.coverImage})` }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                            </motion.div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium glass-subtle text-slate-300">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="relative z-10 py-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="glass-strong p-16 rounded-3xl max-w-4xl mx-auto text-center relative overflow-hidden"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Inner glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Let's Build Something{" "}
                            <span className="gradient-text">
                                Amazing
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
                        </p>
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {settings.email && (
                                <motion.div variants={scaleIn}>
                                    <Button asChild size="lg" className="gradient-button text-lg px-8 rounded-xl shadow-lg shadow-purple-500/25">
                                        <a href={`mailto:${settings.email}`}>Get In Touch</a>
                                    </Button>
                                </motion.div>
                            )}
                            {settings.github && (
                                <motion.div variants={scaleIn}>
                                    <Button asChild size="lg" className="glass-button text-lg px-8 rounded-xl">
                                        <a href={settings.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <motion.footer
                className="relative z-10 glass border-t border-white/10 py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-2xl font-bold gradient-text">
                            {settings.name}
                        </div>
                        <div className="flex gap-6">
                            {settings.github && (
                                <motion.a
                                    href={settings.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    GitHub
                                </motion.a>
                            )}
                            {settings.linkedin && (
                                <motion.a
                                    href={settings.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    LinkedIn
                                </motion.a>
                            )}
                            {settings.twitter && (
                                <motion.a
                                    href={settings.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Twitter
                                </motion.a>
                            )}
                        </div>
                        <p className="text-slate-500 text-sm">
                            © 2025 {settings.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
}
