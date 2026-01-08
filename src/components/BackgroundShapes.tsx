import { useEffect, useRef } from 'react';
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
    const particlesRef = useRef<Particle[]>([]);
    const requestRef = useRef<number>(0);

    // Initialize particles
    useEffect(() => {
        const particleCount = 25; // Increased quantity
        const types: Particle['type'][] = ['circle', 'square', 'triangle', 'x'];
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5, // Random velocity
                vy: (Math.random() - 0.5) * 0.5,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                type: types[Math.floor(Math.random() * types.length)],
                size: Math.random() > 0.5 ? 'small' : 'medium', // Random size
                element: null,
            });
        }

        particlesRef.current = particles;

        const animate = () => {
            if (!containerRef.current) return;

            particlesRef.current.forEach(p => {
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

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="background-shapes" ref={containerRef}>
            {particlesRef.current.map((p, i) => (
                <div
                    key={i}
                    className={`shape-wrapper size-${p.size}`}
                    ref={(el) => { if (particlesRef.current[i]) particlesRef.current[i].element = el }}
                    style={{ position: 'absolute', top: 0, left: 0, willChange: 'transform' }}
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
