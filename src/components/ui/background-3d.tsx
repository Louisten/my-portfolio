"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ParticleField = ({ count = 500, mouse }: { count?: number; mouse: React.MutableRefObject<[number, number]> }) => {
    const mesh = useRef<THREE.Points>(null);
    const light = useRef<THREE.PointLight>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            scales[i] = Math.random();
        }

        return { positions, scales };
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();

        // Rotate the entire particle field slowly
        mesh.current.rotation.x = time * 0.05;
        mesh.current.rotation.y = time * 0.08;

        // Move particles based on mouse position
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            const y = positions[i3 + 1];

            // Add subtle wave effect
            positions[i3 + 2] = Math.sin(x + time) * 0.3 + Math.cos(y + time) * 0.3;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Move light towards mouse
        if (light.current) {
            light.current.position.x = mouse.current[0] * 5;
            light.current.position.y = mouse.current[1] * 5;
        }
    });

    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color="#9333ea" />
            <points ref={mesh}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particles.positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-scale"
                        args={[particles.scales, 1]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#a855f7"
                    sizeAttenuation
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </>
    );
};

const Lines = ({ count = 100 }: { count?: number }) => {
    const linesRef = useRef<THREE.LineSegments>(null);

    const lineData = useMemo(() => {
        const positions: number[] = [];

        for (let i = 0; i < count; i++) {
            // Start point
            const x1 = (Math.random() - 0.5) * 8;
            const y1 = (Math.random() - 0.5) * 8;
            const z1 = (Math.random() - 0.5) * 8;

            // End point (nearby)
            const x2 = x1 + (Math.random() - 0.5) * 2;
            const y2 = y1 + (Math.random() - 0.5) * 2;
            const z2 = z1 + (Math.random() - 0.5) * 2;

            positions.push(x1, y1, z1, x2, y2, z2);
        }

        return new Float32Array(positions);
    }, [count]);

    useFrame((state) => {
        if (!linesRef.current) return;
        const time = state.clock.getElapsedTime();
        linesRef.current.rotation.x = time * 0.03;
        linesRef.current.rotation.y = time * 0.05;
    });

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[lineData, 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
        </lineSegments>
    );
};

const Scene = () => {
    const mouse = useRef<[number, number]>([0, 0]);
    const { viewport } = useThree();

    return (
        <group
            onPointerMove={(e) => {
                mouse.current = [
                    (e.point.x / viewport.width) * 2,
                    (e.point.y / viewport.height) * 2,
                ];
            }}
        >
            {/* Invisible plane for mouse tracking */}
            <mesh visible={false}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial />
            </mesh>
            <ParticleField mouse={mouse} count={600} />
            <Lines count={150} />
            <ambientLight intensity={0.1} />
        </group>
    );
};

export const Background3D = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};
