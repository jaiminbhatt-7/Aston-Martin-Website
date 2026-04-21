'use client';

import { MotionValue, useMotionValueEvent, motion, AnimatePresence, useTransform } from 'framer-motion';
import { useState } from 'react';
import { carData } from '@/data/carData';
import clsx from 'clsx';

interface ZondaExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
    const [phase, setPhase] = useState<'hero' | 'design' | 'engine'>('hero');

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) {
            setPhase('hero');
        } else if (latest < 0.66) {
            setPhase('design');
        } else {
            setPhase('engine');
        }
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-8 md:p-16">
            {/* Decorative HUD Elements */}
            <div className="absolute top-0 left-0 w-full h-full border-[1px] border-white/10 m-4 md:m-8 pointer-events-none rounded-2xl" />
            <div className="absolute top-8 right-8 w-32 h-[1px] bg-pagani-gold/50" />
            <div className="absolute bottom-8 left-8 w-32 h-[1px] bg-pagani-gold/50" />

            {/* Dynamic Content Area */}
            <div className="relative w-full h-full flex items-center">
                <AnimatePresence mode="wait">
                    {phase === 'hero' && (
                        <motion.div
                            key="hero"
                            className="absolute left-0 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-outline-glow">
                                {carData.name}
                            </h1>
                            <div className="mt-4 flex items-center gap-4">
                                <span className="text-2xl text-pagani-gold tracking-widest">{carData.price}</span>
                                <div className="h-[1px] w-12 bg-white/50" />
                                <span className="text-sm tracking-widest opacity-80">{carData.tagline}</span>
                            </div>
                        </motion.div>
                    )}

                    {phase === 'design' && (
                        <motion.div
                            key="design"
                            className="absolute right-0 top-1/4 max-w-lg text-right"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-pagani-gold">
                                {carData.design.title}
                            </h2>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                                {carData.design.description}
                            </p>
                        </motion.div>
                    )}

                    {phase === 'engine' && (
                        <motion.div
                            key="engine"
                            className="absolute right-0 bottom-20 flex flex-col items-end"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-pagani-gold">
                                ENGINEERING
                            </h2>
                            <div className="space-y-4 text-right">
                                <SpecItem label="Engine" value={carData.engine.type} />
                                <SpecItem label="Power" value={carData.engine.horsepower} />
                                <SpecItem label="Torque" value={carData.engine.torque} />
                                <SpecItem label="0-60 MPH" value={carData.engine.acceleration} />
                                <SpecItem label="Top Speed" value={carData.engine.topSpeed} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress Indicator */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-white/10 overflow-hidden">
                <ProgressBar scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}

function SpecItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-end gap-4 border-b border-white/10 pb-2">
            <span className="text-sm text-gray-500 uppercase tracking-widest">{label}</span>
            <span className="text-xl font-bold text-white">{value}</span>
        </div>
    );
}

function ProgressBar({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <motion.div
            className="w-full bg-pagani-gold"
            style={{ height }}
        />
    );
}
