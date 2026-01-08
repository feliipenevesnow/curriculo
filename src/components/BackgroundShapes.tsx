import { useEffect, useRef, useState } from 'react';
import './BackgroundShapes.css';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    type: 'circle' | 'square' | 'triangle' | 'x';
    size: 'small' | 'medium';
    element: HTMLDivElement | null;
}

export function BackgroundShapes() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const animationRef = useRef<number>(0);

    // Initialize particles on mount
    useEffect(() => {
        const particleCount = 25;
        const types: Particle['type'][] = ['circle', 'square', 'triangle', 'x'];
        const newParticles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                type: types[Math.floor(Math.random() * types.length)],
                size: Math.random() > 0.5 ? 'small' : 'medium',
                element: null,
            });
        }
        setParticles(newParticles);
    }, []);

    // Animation loop
    useEffect(() => {
        if (particles.length === 0) return;

        const animate = () => {
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                // Bounce off edges
                if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
                if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

                if (p.element) {
                    p.element.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
                }
            });
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [particles]);

    return (
        <div className="background-shapes" ref={containerRef}>
            {particles.map((p, i) => (
                <div
                    key={i}
                    className={`shape-wrapper size-${p.size}`}
                    ref={(el) => { particles[i].element = el }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        willChange: 'transform',
                        transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)` // Initial position
                    }}
                >
                    {p.type === 'circle' && <div className="shape shape-circle" />}
                    {p.type === 'square' && <div className="shape shape-square" />}
                    {p.type === 'triangle' && (
                        <svg className="shape shape-triangle-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="50,10 90,90 10,90" />
                        </svg>
                    )}
                    {p.type === 'x' && <div className="shape shape-x">×</div>}
                </div>
            ))}
        </div>
    );
}
