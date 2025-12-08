"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

export const StarsBackground = ({
    starDensity = 0.00015,
    allStarsTwinkle = true,
    twinkleProbability = 0.7,
    minTwinkleSpeed = 0.5,
    maxTwinkleSpeed = 1,
    className,
}: {
    starDensity?: number;
    allStarsTwinkle?: boolean;
    twinkleProbability?: number;
    minTwinkleSpeed?: number;
    maxTwinkleSpeed?: number;
    className?: string;
}) => {
    const [stars, setStars] = useState<
        {
            x: number;
            y: number;
            radius: number;
            opacity: number;
            twinkleSpeed: number | null;
        }[]
    >([]);

    useEffect(() => {
        const generateStars = () => {
            const { innerWidth, innerHeight } = window;
            const area = innerWidth * innerHeight;
            const numStars = Math.floor(area * starDensity);
            return Array.from({ length: numStars }).map(() => {
                const shouldTwinkle =
                    allStarsTwinkle || Math.random() < twinkleProbability;
                return {
                    x: Math.random() * innerWidth,
                    y: Math.random() * innerHeight,
                    radius: Math.random() * 0.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.5,
                    twinkleSpeed: shouldTwinkle
                        ? minTwinkleSpeed +
                        Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
                        : null,
                };
            });
        };

        setStars(generateStars());

        const handleResize = () => {
            setStars(generateStars());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [
        starDensity,
        allStarsTwinkle,
        twinkleProbability,
        minTwinkleSpeed,
        maxTwinkleSpeed,
    ]);

    return (
        <div
            className={cn("fixed inset-0 h-full w-full z-0 pointer-events-none", className)}
        >
            <svg className="h-full w-full w-full">
                {stars.map((star, idx) => (
                    <circle
                        key={idx}
                        cx={star.x}
                        cy={star.y}
                        r={star.radius}
                        className="star-twinkle"
                        fill="white"
                        style={{
                            opacity: star.opacity,
                            animation: star.twinkleSpeed
                                ? `twinkle ${1 / star.twinkleSpeed}s ease-in-out infinite alternate`
                                : undefined,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};
