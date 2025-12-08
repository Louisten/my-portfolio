"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Suspense, useMemo } from "react";

// Lazy load the heavy 3D background component
const Background3D = dynamic(
    () => import("@/components/ui/background-3d").then(mod => ({ default: mod.Background3D })),
    {
        ssr: false,
        loading: () => null // Show nothing while loading, CSS gradient is the fallback
    }
);

interface Settings {
    name: string;
    tagline: string;
    techStack: string[];
    email?: string | null;
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    profileImage?: string | null;
}
import { Briefcase, FileCode2, Github, Globe, GraduationCap, Heart, LayoutGrid, Linkedin, Mail, MapPin, Terminal, Twitter, User } from "lucide-react";

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    tags: string[];
}

interface Experience {
    id: string;
    type: string;
    title: string;
    company: string;
    location?: string | null;
    description?: string | null;
    skills: string[];
    startDate: string;
    endDate?: string | null;
    current: boolean;
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
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [showAllExperiences, setShowAllExperiences] = useState(false);

    const displayedExperiences = useMemo(() => {
        if (showAllExperiences) return experiences;
        return experiences.slice(0, 5);
    }, [experiences, showAllExperiences]);

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

        fetch("/api/experiences").then(res => res.json()).then(data => {
            if (data.success) setExperiences(data.data || []);
        }).catch(() => { });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* 3D Interactive Background */}
            <Background3D />

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
            <section className="relative z-10 container mx-auto px-6 py-24 md:py-32 flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 lg:gap-20 items-center">
                    {/* Text Content - Takes 3 columns */}
                    <div className="md:col-span-3 text-center md:text-left order-2 md:order-1">
                        <motion.div
                            className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full mb-6 hover:bg-white/10 transition-colors cursor-default"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-slate-300">Available for new projects</span>
                        </motion.div>

                        <motion.p
                            className="text-lg text-slate-400 mb-4"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Hi, I'm <span className="text-white font-semibold">{settings.name}</span> 👋
                        </motion.p>

                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            I build{" "}
                            <span className="gradient-text">
                                digital experiences
                            </span>{" "}
                            that matter
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {settings.tagline || "Full Stack Developer specializing in React, Next.js, and TypeScript. Creating performant, accessible, and beautiful web applications."}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Button asChild size="lg" className="gradient-button text-base px-8 py-6 rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300">
                                <Link href="/projects">View My Work</Link>
                            </Button>
                            <Button asChild size="lg" className="glass-button text-base px-8 py-6 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300">
                                <Link href="/about">About Me</Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Profile Picture - Takes 2 columns */}
                    <motion.div
                        className="md:col-span-2 flex justify-center order-1 md:order-2"
                        initial="hidden"
                        animate="visible"
                        variants={scaleIn}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative">
                            {/* Glow effect behind image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 to-cyan-500/60 rounded-3xl blur-3xl scale-110 opacity-60" />

                            {/* Outer decorative border */}
                            <div className="absolute -inset-3 rounded-[2rem] border border-purple-500/20" />
                            <div className="absolute -inset-6 rounded-[2.5rem] border border-cyan-500/10" />

                            {/* Profile Image Container */}
                            <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[26rem] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl shadow-purple-500/20">
                                {settings.profileImage ? (
                                    <Image
                                        src={settings.profileImage}
                                        alt={settings.name}
                                        fill
                                        sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                                        className="object-cover"
                                        priority
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIRAAAgEDBAMBAAAAAAAAAAAAAQIDBAAFBhESITFBUXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqNR6mzGIx8VxbRWksUo5RmaNnZQewQGHR+9dUUoD/9k="
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-cyan-500/30 flex items-center justify-center">
                                        <span className="text-6xl">👤</span>
                                    </div>
                                )}
                                {/* Subtle gradient overlay on image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                            </div>

                            {/* Animated decorative border */}
                            <div className="absolute -inset-1 rounded-[1.75rem] border-2 border-purple-500/30 animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="relative z-10 py-12 overflow-hidden">
                <div className="glass-strong border-y border-white/5 py-12">
                    <div className="flex relative overflow-hidden">
                        <div className="flex animate-marquee gap-8 items-center min-w-full justify-around shrink-0 px-4">
                            {(settings.techStack.length > 0 ? settings.techStack : ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "GraphQL"]).map((tech, index) => (
                                <span key={`t1-${index}`} className="text-2xl md:text-4xl font-bold text-slate-500/40 whitespace-nowrap hover:text-slate-300 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex animate-marquee gap-8 items-center min-w-full justify-around shrink-0 px-4" aria-hidden="true">
                            {(settings.techStack.length > 0 ? settings.techStack : ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "GraphQL"]).map((tech, index) => (
                                <span key={`t2-${index}`} className="text-2xl md:text-4xl font-bold text-slate-500/40 whitespace-nowrap hover:text-slate-300 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            {experiences.length > 0 && (
                <section className="relative z-10 py-32">
                    <div className="container mx-auto px-6">
                        <motion.div
                            className="mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience</h2>
                            <p className="text-slate-400 max-w-xl text-lg">
                                My professional journey across different roles and organizations.
                            </p>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                        >
                            {/* Timeline line */}
                            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-transparent" />

                            <div className="space-y-8">
                                {displayedExperiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        className="relative pl-16 md:pl-20"
                                        variants={fadeInUp}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-3 md:left-5 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                            {exp.type === "work" && <Briefcase className="w-3 h-3 text-white" />}
                                            {exp.type === "education" && <GraduationCap className="w-3 h-3 text-white" />}
                                            {exp.type === "volunteer" && <Heart className="w-3 h-3 text-white" />}
                                        </div>

                                        {/* Experience card */}
                                        <div className="glass-card p-6 md:p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    <p className="text-purple-400 font-medium">{exp.company}</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                                                    </span>
                                                    {exp.location && (
                                                        <span className="hidden md:flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {exp.location}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {exp.description && (
                                                <p className="text-slate-400 mb-4 leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            )}

                                            {exp.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.skills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Show More/Less Button */}
                        {experiences.length > 5 && (
                            <motion.div
                                className="mt-12 text-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <Button
                                    onClick={() => setShowAllExperiences(!showAllExperiences)}
                                    variant="ghost"
                                    className="glass-button text-slate-300 hover:text-white rounded-full px-8 py-6 text-lg group"
                                >
                                    {showAllExperiences ? (
                                        <>Show Less<span className="ml-2 group-hover:-translate-y-1 transition-transform">↑</span></>
                                    ) : (
                                        <>Show {experiences.length - 5} More<span className="ml-2 group-hover:translate-y-1 transition-transform">↓</span></>
                                    )}
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* Featured Projects Section */}
            {projects.length > 0 && (
                <section className="relative z-10 py-32">
                    <div className="container mx-auto px-6">
                        <motion.div
                            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
                                <p className="text-slate-400 max-w-xl text-lg">
                                    A selection of my recent work, built with modern technologies and attention to detail.
                                </p>
                            </div>
                            <Button asChild variant="ghost" className="text-slate-300 hover:text-white glass-button rounded-full px-8 py-6 text-lg group">
                                <Link href="/projects">
                                    View All Works
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
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
                                    <Link href={`/projects/${project.slug}`} className="block h-full">
                                        <div className="glass-card overflow-hidden group h-full flex flex-col hover:-translate-y-2 transition-transform duration-500">
                                            <div className="aspect-video relative overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                    style={{ backgroundImage: `url(${project.coverImage})` }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                            </div>
                                            <div className="p-8 flex-1 flex flex-col">
                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-slate-400 mb-6 line-clamp-2 flex-grow">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-auto">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300">
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
                        className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-24 text-center border border-white/10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Background Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-slate-900/50 backdrop-blur-xl" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-purple-500/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                                Ready to bring your ideas to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">life?</span>
                            </h2>
                            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>

                            <motion.div
                                className="flex flex-col sm:flex-row justify-center gap-6"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {settings.email && (
                                    <motion.div variants={scaleIn}>
                                        <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 text-lg px-10 py-7 rounded-full font-semibold transition-all duration-300 shadow-xl shadow-white/5">
                                            <a href={`mailto:${settings.email}`}>Start a Project</a>
                                        </Button>
                                    </motion.div>
                                )}
                                {settings.github && (
                                    <motion.div variants={scaleIn}>
                                        <Button asChild size="lg" className="glass-button text-lg px-10 py-7 rounded-full hover:bg-white/10">
                                            <a href={settings.github} target="_blank" rel="noopener noreferrer">Check GitHub</a>
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
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
