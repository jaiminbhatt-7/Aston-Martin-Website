'use client';

import { motion } from 'framer-motion';
import { carData } from '@/data/carData';

export default function Features() {
    return (
        <section className="py-24 px-6 md:px-12 bg-carbon-gray relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-24">
                {carData.features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex-1 space-y-6">
                            <div className="w-12 h-1 bg-pagani-gold" />
                            <h3 className="text-3xl md:text-4xl font-bold text-white">{feature.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                        </div>

                        {/* Placeholder for feature image/graphic */}
                        <div className="flex-1 w-full aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/20 text-4xl font-bold uppercase tracking-widest group-hover:text-pagani-gold/50 transition-colors duration-500">
                                    {feature.title} View
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
