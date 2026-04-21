'use client';

import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>; // 0 to 1
    totalFrames: number;
    imageFolderPath: string;
}

export default function ZondaScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= totalFrames; i++) {
            // Format: ezgif-frame-001.jpg
            const paddedIndex = i.toString().padStart(3, '0');
            const img = new Image();
            img.src = `${imageFolderPath}/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    // Draw Frame Logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions to window size with DPR
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        // Ensure CSS size matches window
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        ctx.scale(dpr, dpr);

        // Clear Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = images[index];

        // Object Fit: Contain Logic
        const canvasRatio = window.innerWidth / window.innerHeight;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image -> fit to height
            drawHeight = window.innerHeight;
            drawWidth = img.width * (window.innerHeight / img.height);
            offsetX = (window.innerWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Canvas is narrower than image -> fit to width
            drawWidth = window.innerWidth;
            drawHeight = img.height * (window.innerWidth / img.width);
            offsetX = 0;
            offsetY = (window.innerHeight - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Sync with Scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map 0-1 to 0-(totalFrames-1)
        const frameIndex = Math.min(
            Math.max(Math.floor(latest * (totalFrames - 1)), 0),
            totalFrames - 1
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial Render when loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded, images]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded && images.length > 0) {
                // Re-render current frame on resize
                const currentProgress = scrollYProgress.get();
                const frameIndex = Math.min(
                    Math.max(Math.floor(currentProgress * (totalFrames - 1)), 0),
                    totalFrames - 1
                );
                renderFrame(frameIndex);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, scrollYProgress, totalFrames]);


    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-contain pointer-events-none z-0"
        />
    );
}
