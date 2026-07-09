import React, { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            // Optimize count: High for desktop, Low for mobile
            const particleCount = window.innerWidth < 768 ? 160 : 340;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2.2 + 0.5,
                    speedY: Math.random() * 0.8 + 0.3, // Drift upward
                    drift: (Math.random() - 0.5) * 0.4, // Sideways sway
                    opacity: Math.random() * 0.6 + 0.2,
                    phase: Math.random() * 6, // Flicker offset
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Flickering cyan ember glow
                p.phase += 0.05;
                const flicker = 0.6 + 0.4 * Math.sin(p.phase);
                ctx.fillStyle = `rgba(42, ${180 + Math.floor(60 * flicker)}, 230, ${p.opacity * flicker})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Drift upward with slight sway
                p.y -= p.speedY;
                p.x += p.drift;

                // Reset to bottom when past the top
                if (p.y < -5) {
                    p.y = canvas.height + 5;
                    p.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        resizeCanvas();
        createParticles();
        drawParticles();

        const handleResize = () => {
            resizeCanvas();
            createParticles();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // Allow clicking through
                zIndex: -1, // Behind everything
                background: 'transparent' // Let CSS background show through if needed
            }}
        />
    );
};

export default ParticlesBackground;
