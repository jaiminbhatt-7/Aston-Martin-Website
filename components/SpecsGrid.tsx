'use client';

import { motion } from 'framer-motion';

const specs = [
    { label: "Engine", value: "5.2L V12 Twin-Turbo" },
    { label: "Transmission", value: "8-Speed Automatic" },
    { label: "Power", value: "630 BHP @ 6500 RPM" },
    { label: "Torque", value: "700 NM @ 1500 RPM" },
    { label: "0-62 MPH", value: "3.7 Seconds" },
    { label: "Top Speed", value: "208 MPH" },
    { label: "Weight", value: "1870 KG" },
    { label: "Length", value: "4750 MM" },
];

export default function SpecsGrid() {
    return (
        <section className="py-24 px-6 md:px-12 bg-pagani-black relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-16 text-center text-pagani-gold"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    TECHNICAL SPECIFICATIONS
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {specs.map((spec, index) => (
                        <motion.div
                            key={index}
                            className="p-6 border border-white/10 hover:border-pagani-gold/50 transition-colors duration-300 bg-white/5 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">{spec.label}</h3>
                            <p className="text-xl md:text-2xl font-bold text-white">{spec.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
