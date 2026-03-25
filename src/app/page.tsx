import dynamic from 'next/dynamic';
import HeroSequence from '@/components/HeroSequence';
import About from '@/components/About';

// Below-fold components: lazy loaded for faster initial render
const Experience = dynamic(() => import('@/components/Experience'));
const Skills = dynamic(() => import('@/components/Skills'));
const Contact = dynamic(() => import('@/components/Contact'));
const GradientBackground = dynamic(
  () => import('@/components/ui/gradient-background').then(m => ({ default: m.GradientBackground }))
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] selection:bg-neutral-800 selection:text-white">
      {/* Cinematic Scroll Sequence Hero, now spanning over About Me */}
      <HeroSequence>
        <About />
      </HeroSequence>

      <GradientBackground>
        {/* Seamless blend from the dark Hero background */}
        <div className="absolute top-0 w-full h-[30rem] bg-gradient-to-b from-[#0a0a0a] to-transparent z-0 pointer-events-none" />

        <div className="relative z-10 w-full">
          {/* Experience & Achievements Grid */}
          <Experience />

        {/* Skills & Tools Grid */}
        <Skills />

        {/* Contact & Footer Section */}
        <Contact />
        </div>
      </GradientBackground>
    </main>
  );
}
