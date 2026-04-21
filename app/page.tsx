'use client';

import { useScroll, motion, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ZondaScrollCanvas from '@/components/ZondaScrollCanvas';
import ZondaExperience from '@/components/ZondaExperience';
import SpecsGrid from '@/components/SpecsGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Debug scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("Scroll Progress:", latest); 
  });

  return (
    <main className="bg-pagani-black min-h-screen">
      <Navbar />

      {/* 
        Scroll Section 
        - Height 500vh to ensure enough scroll distance
        - Sticky container to keep canvas/HUD fixed while scrolling
      */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={181}
            imageFolderPath="/images/am-sequence"
          />
          <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* Content Below Scroll Sequence */}
      <div className="relative z-20 bg-pagani-black border-t border-white/10">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
