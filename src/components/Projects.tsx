import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Aethel UI',
    category: 'Design Engineering',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // placeholder abstract pattern
  },
  {
    title: 'Nexa Finance',
    category: 'Front-End Architecture',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'Lumina Engine',
    category: 'WebGL & Shaders',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', 
  },
  {
    title: 'Hyperloom',
    category: 'Interactive E-Commerce',
    image: 'https://images.unsplash.com/photo-1611080352277-3367ec9f0612?q=80&w=2670&auto=format&fit=crop',
  }
];

export default function Projects() {
  return (
    <section className="bg-[#121212] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Selected Works
          </h2>
          <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-800 hover:bg-neutral-800/50 transition-colors text-sm font-medium text-white group">
            View Archive
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div 
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-all duration-500 hover:border-neutral-600 aspect-[4/3] cursor-pointer"
            >
              {/* Image using standard img tag for simplicity, you could use Next Image later */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                style={{ backgroundImage: `url(${project.image})` }}
                aria-hidden="true"
              />
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <p className="text-neutral-400 text-sm font-medium mb-2 tracking-wide uppercase">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
