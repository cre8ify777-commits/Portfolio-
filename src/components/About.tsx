export default function About() {
  return (
    <section id="about" className="bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: About Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8">
            About Me
          </h2>
          <div className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed">
            <p>
              I am a marketing professional specializing in AI-driven marketing tools, lead generation, and strategic customer engagement.
            </p>
            <p>
              During my internship at <span className="text-white font-medium">Mercedes-Benz (Silver Star)</span> in Pune, I gained practical exposure to luxury automotive sales, customer relationship management, and sales pipeline support. My role involved identifying potential customers through cold calling, maintaining prospect records, and coordinating test drives to support the sales team.
            </p>
            <p>
              I am passionate about combining traditional marketing strategies with modern AI tools to improve market research, decision-making, and productivity.
            </p>
            <p>
              Alongside my professional journey, I am also a <span className="text-white font-medium">3-time National MMA Champion</span>, which has instilled discipline, resilience, and a strong performance mindset in my personal and professional life.
            </p>
          </div>
        </div>

        {/* Right Side: Quick Stats / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-center backdrop-blur-sm hover:border-neutral-700 transition-colors">
            <h3 className="text-5xl font-bold text-white mb-2">5+</h3>
            <p className="text-sm tracking-wide text-neutral-500 uppercase font-semibold">Test Drives Facilitated</p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-center backdrop-blur-sm hover:border-neutral-700 transition-colors">
            <h3 className="text-5xl font-bold text-white mb-2">3×</h3>
            <p className="text-sm tracking-wide text-neutral-500 uppercase font-semibold">National MMA Champion</p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-center backdrop-blur-sm hover:border-neutral-700 transition-colors sm:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-2">AI Workflow Specialist</h3>
            <p className="text-sm tracking-wide text-neutral-500 uppercase font-semibold">Prompt Engineering & Market Research</p>
          </div>
        </div>
      </div>
    </section>
  );
}
