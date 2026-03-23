const skillCategories = [
  {
    title: 'Sales & Marketing',
    skills: [
      'Lead Generation',
      'Sales Pipeline Management',
      'Customer Relationship Management',
      'Market Research',
      'Customer Engagement Strategies',
      'Sales Support & Operations'
    ]
  },
  {
    title: 'AI & Digital Skills',
    skills: [
      'Prompt Engineering',
      'AI Workflow Optimization',
      'AI-Driven Market Research',
      'AI Content Generation',
      'Business Research using AI Tools'
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      'ChatGPT',
      'Perplexity AI',
      'NotebookLM',
      'Canva'
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8">
          Skills & Expertise
        </h2>
        
        <p className="text-neutral-400 mb-16 max-w-2xl text-lg font-light">
          A blend of traditional sales acumen and modern AI capabilities used for research, content creation, and decision support in marketing and business projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 hover:bg-neutral-900/50 transition-colors">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-6">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx}
                    className="px-4 py-2 bg-neutral-800/50 text-neutral-300 text-sm font-medium rounded-full cursor-default hover:bg-neutral-700 transition-colors pointer-events-auto"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
