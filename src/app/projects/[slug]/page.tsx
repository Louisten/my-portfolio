"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";

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
    demoUrl?: string | null;
    repoUrl?: string | null;
    content?: string | null;
    publishedAt?: string | null;
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

const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
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

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [project, setProject] = useState<Project | null>(null);
    const [settings, setSettings] = useState<Settings>({ name: "Your Name" });
    const [isLoading, setIsLoading] = useState(true);
    const [notFoundState, setNotFoundState] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch(`/api/projects/${slug}`).then(res => res.json()),
            fetch("/api/settings").then(res => res.json())
        ]).then(([projectData, settingsData]) => {
            if (projectData.success && projectData.data) {
                setProject(projectData.data);
            } else {
                setNotFoundState(true);
            }
            if (settingsData.success) setSettings(settingsData.data);
            setIsLoading(false);
        }).catch(() => {
            setNotFoundState(true);
            setIsLoading(false);
        });
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
                <div className="glass-card px-8 py-4 rounded-2xl">
                    <span className="text-slate-400">Loading project...</span>
                </div>
            </div>
        );
    }

    if (notFoundState || !project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <p className="text-slate-400 mb-8">The project you're looking for doesn't exist.</p>
                <Button asChild className="gradient-button">
                    <Link href="/projects">Back to Projects</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-float-slow animate-pulse-glow" />
                <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-3xl animate-float-medium animate-pulse-glow" style={{ animationDelay: '2s' }} />
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
                            <Link href="/">Home</Link>
                        </Button>
                    </nav>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="relative z-10 flex-1">
                <div className="container mx-auto px-6 py-8">
                    {/* Back Button */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </Link>
                    </motion.div>

                    {/* Two Column Layout */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Left Column - Image */}
                        <motion.div
                            className="lg:sticky lg:top-8"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInLeft}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative rounded-3xl overflow-hidden glass-card">
                                <div className="aspect-[4/3] relative">
                                    <Image
                                        src={project.coverImage}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                </div>

                                {/* Action Buttons - Inside Image Card */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex flex-wrap gap-3">
                                        {project.demoUrl && (
                                            <Button asChild size="lg" className="gradient-button rounded-full px-6 shadow-lg shadow-purple-500/25">
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.repoUrl && (
                                            <Button asChild size="lg" className="glass-button rounded-full px-6 bg-white/10 backdrop-blur-md">
                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    Source
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Tags - Below Image on Desktop */}
                            <motion.div
                                className="hidden lg:flex flex-wrap gap-2 mt-6"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {project.tags.map((tag) => (
                                    <motion.span
                                        key={tag}
                                        className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300"
                                        variants={fadeIn}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInRight}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Date */}
                            {project.publishedAt && (
                                <div className="flex items-center gap-2 text-slate-400 mb-4">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(project.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {project.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-6">
                                {project.description}
                            </p>

                            {/* Tags - Mobile Only */}
                            <motion.div
                                className="flex lg:hidden flex-wrap gap-2 mb-8"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {project.tags.map((tag) => (
                                    <motion.span
                                        key={tag}
                                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300"
                                        variants={fadeIn}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>

                            {/* Content */}
                            {project.content && (
                                <div className="glass-card p-6 md:p-8 rounded-2xl mb-8">
                                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-purple-300 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded">
                                        {project.content.split('\n').map((line, i) => {
                                            if (line.startsWith('# ')) {
                                                return <h2 key={i} className="text-2xl font-bold mb-4 mt-6 first:mt-0">{line.slice(2)}</h2>;
                                            }
                                            if (line.startsWith('## ')) {
                                                return <h3 key={i} className="text-xl font-bold mb-3 mt-5">{line.slice(3)}</h3>;
                                            }
                                            if (line.startsWith('### ')) {
                                                return <h4 key={i} className="text-lg font-bold mb-2 mt-4">{line.slice(4)}</h4>;
                                            }
                                            if (line.startsWith('- ')) {
                                                return <li key={i} className="text-slate-300 ml-4">{line.slice(2)}</li>;
                                            }
                                            if (line.trim() === '') {
                                                return <br key={i} />;
                                            }
                                            return <p key={i} className="text-slate-300 mb-3">{line}</p>;
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="pt-4">
                                <Button asChild variant="ghost" className="glass-button text-slate-300 hover:text-white rounded-full px-6 py-5 group">
                                    <Link href="/projects">
                                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                        View All Projects
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
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
