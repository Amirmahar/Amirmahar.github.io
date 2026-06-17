import { ExperienceItem } from '../types';
import { ShieldCheck, Calendar } from 'lucide-react';

const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Lead AI Solutions & Growth Developer',
    company: 'Self-Employed (Client Solutions)',
    period: 'Aug 2023 — Present',
    description: 'Design and deploy user-friendly AI integrations and smart tools for local and international businesses to boost sales and cut down on manual work.',
    achievements: [
      'Created intelligent lead finding systems that reduce manual searching time by over 80% for sales teams.',
      'Integrated powerful AI assistants to draft custom emails and messages automatically inside business software.',
      'Improved customer service response times by connecting instant, auto-triggered reminders and updates via Slack and SMS.'
    ]
  },
  {
    role: 'Backend & Lead Generation Architect',
    company: 'Open-Source AI & Data Modules',
    period: 'Nov 2022 — Present',
    description: 'Build smart data extraction systems and API connectors using modern web tech to retrieve and organize valuable target clients.',
    achievements: [
      'Developed automated map parsing systems generating high-value regional business lists with exact details.',
      'Refined data systems to easily process huge batches (50,000+ entries) without delays or errors.'
    ]
  }
];

export default function AboutMe() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-35 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Exact typography paragraph from user mockup */}
        <div className="lg:col-span-6 flex flex-col gap-6" id="about-narrative">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/5 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-brand-slate">01_SYSTEM_BOOT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-900 mb-6">
              System Initialized: <br/>About Me
            </h2>
          </div>

          <div className="space-y-6 text-brand-slate font-sans leading-relaxed text-base">
            <p className="text-neutral-900 font-medium">
              Based in Pakistan, I am a student navigating the intersection of formal education and self-taught engineering. Over the past 10 months, I have immersed myself entirely in the world of smart business technology and AI.
            </p>
            <p>
              I build systems that save time and help you grow. From compiling high-value business leads to orchestrating intelligent AI-driven workflows, my focus is always on robust results and seamless execution that a business owner can trust.
            </p>
            <p>
              I believe smart technology isn’t about complicating things; it’s about freeing your time to solve higher-level challenges. That's why I build digital engines that run perfectly in the background to grow your client base.
            </p>
          </div>

          {/* Quick Technical stats cards */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-lg border border-black/5 bg-neutral-50 flex flex-col gap-1.5">
              <span className="text-2xl font-extrabold text-neutral-800 font-mono tracking-tight">10+ Mths</span>
              <span className="text-[11px] font-mono text-brand-slate uppercase tracking-wider">Immersion Practice</span>
            </div>
            <div className="p-5 rounded-lg border border-black/5 bg-neutral-50 flex flex-col gap-1.5">
              <span className="text-2xl font-extrabold text-neutral-800 font-mono tracking-tight">50+ Runs</span>
              <span className="text-[11px] font-mono text-brand-slate uppercase tracking-wider">Active Workflows</span>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Timeline / Accomplishments */}
        <div className="lg:col-span-6" id="about-experience">
          <div className="border border-black/5 rounded-2xl bg-brand-bg/60 p-6 md:p-8 backdrop-blur" id="experience">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-800" />
                <span className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">Engineering Timeline</span>
              </div>
              <span className="text-[10px] font-mono bg-black/5 text-brand-slate px-2 py-0.5 rounded uppercase">03_EXPERIENCE</span>
            </div>

            <div className="space-y-8 relative">
              {/* Timeline Center Line */}
              <div className="absolute top-2 bottom-2 left-3.5 w-[1px] bg-black/[0.08]" />

              {EXPERIENCE.map((job, idx) => (
                <div key={idx} className="relative pl-10 group" id={`experience-timeline-node-${idx}`}>
                  {/* Timeline bullet beacon */}
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-white border border-black flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-indigo-600 transition-colors" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-md font-bold text-neutral-900 group-hover:text-black transition-colors">
                        {job.role}
                      </h4>
                      <span className="text-[10px] font-mono font-bold bg-white border border-black/5 text-brand-slate px-2.5 py-1 rounded">
                        {job.period}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-brand-slate font-medium">
                      {job.company}
                    </span>

                    <p className="text-sm text-brand-slate font-sans mt-2.5 leading-relaxed">
                      {job.description}
                    </p>

                    <ul className="mt-3 space-y-2">
                      {job.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs text-brand-slate flex items-start gap-2.5 leading-relaxed">
                          <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
