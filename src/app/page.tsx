import HeroSequence from '@/components/HeroSequence';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import { GradientBackground } from '@/components/ui/gradient-background';

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
