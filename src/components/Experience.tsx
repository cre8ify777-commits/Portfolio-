import { Trophy, Briefcase, Star, Target } from 'lucide-react';

const experiences = [
  {
    title: 'Sales Trainee',
    company: 'Mercedes-Benz (Silver Star), Pune',
    date: 'June 2025 – September 2025',
    icon: Briefcase,
    highlights: [
      'Successfully arranged and facilitated 5 test drives, contributing to customer acquisition efforts.',
      'Conducted structured cold calling and lead generation activities.',
      'Identified and engaged potential customers interested in luxury vehicles.',
      'Improved prospect engagement through consistent follow-ups and personalized communication.'
    ]
  },
  {
    title: '3-Time National Champion',
    company: 'Mixed Martial Arts (MMA)',
    date: 'Athletic Achievement',
    icon: Trophy,
    highlights: [
      'Achieved national-level success through dedication, discipline, and consistent performance.',
      'Represented Maharashtra in a national-level inter-university tournament (IUT), competing against top athletes across India.'
    ]
  },
  {
    title: 'Winner',
    company: 'Brand Revival Competition',
    date: 'Marketing Strategy',
    icon: Star,
    highlights: [
      'Developed a comprehensive brand revival strategy by analyzing market perception.',
      'Identified brand positioning gaps and proposed innovative marketing initiatives.'
    ]
  },
  {
    title: '2nd Runner-Up & Participant',
    company: 'HR Business Model Canvas & Speed Selling',
    date: 'Business & Sales Competitions',
    icon: Target,
    highlights: [
      'Created a complete business model canvas including value proposition, customer segments, and strategic partnerships.',
      'Participated in high-pressure selling simulations focused on quick decision-making and persuasive communication.'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-16">
          Experience & Achievements
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <div 
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900/30 border border-neutral-800 hover:border-neutral-600 transition-all duration-500 p-8 flex flex-col"
              >
                {/* Subtle gradient glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex items-start gap-6 mb-8">
                  <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700/50">
                    <Icon className="w-6 h-6 text-neutral-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white tracking-tight mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-neutral-400 font-medium">
                      {exp.company}
                    </p>
                    <p className="text-neutral-500 text-sm mt-1 uppercase tracking-widest font-semibold">
                      {exp.date}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, j) => (
                      <li key={j} className="flex gap-3 text-neutral-400 font-light">
                        <span className="text-neutral-600 mt-1.5 flex-shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
