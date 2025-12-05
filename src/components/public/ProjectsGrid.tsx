"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@prisma/client";

interface ProjectsGridProps {
    projects: Project[];
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    if (projects.length === 0) {
        return (
            <motion.div
                className="py-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="glass-card inline-block px-12 py-8 rounded-2xl">
                    <p className="text-lg text-slate-400">
                        No projects found. Check back soon! 🚀
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <ProjectCard
                        project={project}
                        priority={index < 3}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
