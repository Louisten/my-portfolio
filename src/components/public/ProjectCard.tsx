"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@prisma/client";

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`} className="group block">
            <motion.div
                className="glass-card overflow-hidden h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-300" />
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-medium glass-subtle text-slate-300"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium glass-subtle text-slate-400">
                                +{project.tags.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
