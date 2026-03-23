import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <footer id="contact" className="bg-transparent pt-32 pb-16 px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-neutral-800/20 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
          Let's connect.
        </h2>
        <p className="text-xl text-neutral-400 font-light mb-16 leading-relaxed">
          I am always open to opportunities in AI-driven marketing, product growth, and strategic sales roles. Let's create meaningful business impact through marketing, technology, and strategy.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
          <a
            href="mailto:adityakanchan02@gmail.com"
            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-neutral-200 transition-colors w-full md:w-auto justify-center group"
          >
            Email Me
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-neutral-500 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>Pune, Maharashtra</span>
          </div>
          <a href="mailto:adityakanchan02@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
            <span>adityakanchan02@gmail.com</span>
          </a>
          <a href="tel:+919834311387" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
            <span>+91 9834311387</span>
          </a>
        </div>

        <div className="mt-24 pt-8 border-t border-neutral-900 flex justify-between items-center text-sm text-neutral-600 font-medium">
          <p>© {new Date().getFullYear()} Aditya Sanjay Kanchan</p>
          <p>Portfolio</p>
        </div>
      </div>
    </footer>
  );
}
