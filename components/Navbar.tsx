'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 glass-panel border-b-0"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Link href="/" className="group">
                <h1 className="text-2xl font-bold tracking-widest text-white group-hover:text-pagani-gold transition-colors duration-300">
                    ASTON MARTIN
                </h1>
            </Link>

            <button className="px-6 py-2 text-sm font-bold tracking-widest text-black bg-white hover:bg-pagani-gold transition-colors duration-300 uppercase clip-path-slant">
                Inquire Now
            </button>

            <style jsx>{`
        .clip-path-slant {
          clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
        </motion.nav>
    );
}
