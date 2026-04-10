'use client';

import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
        const fontSize = 16; // Aumentado ligeiramente para nitidez
        const columns = canvas.width / fontSize;

        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            // Fundo escuro profundo com rastro
            ctx.fillStyle = 'rgba(13, 13, 13, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Caractere líder (mais brilhante)
                ctx.fillStyle = '#DBFCFF'; // Quase branco/ciano muito claro
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#00F0FF';
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Caracteres de rastro (mais escuros e sem glow intenso)
                ctx.shadowBlur = 0;
                ctx.fillStyle = 'rgba(0, 240, 255, 0.35)'; // Opacidade aumentada para nitidez
                ctx.fillText(text, i * fontSize, (drops[i] - 1) * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-60"
            style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}
        />
    );
};

export default MatrixRain;
