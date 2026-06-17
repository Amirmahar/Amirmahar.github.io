import { useState } from 'react';
import Header from './components/Header';
import SidebarRail from './components/SidebarRail';
import InteractiveCanvas from './components/InteractiveCanvas';
import AboutMe from './components/AboutMe';
import ProjectSection from './components/ProjectSection';
import ContactPipeline from './components/ContactPipeline';
import { ArrowRight, FileCode, Download, FileText, X, Settings2, Terminal, Layers } from 'lucide-react';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scrolling for header
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTriggerDemo = () => {
    // Scroll smoothly to Work section
    handleNavigate('work');
    // Programmatically fire the demonstration webhook if possible
    setTimeout(() => {
      const triggerButton = document.getElementById('trigger-webhook-btn');
      if (triggerButton) {
        triggerButton.click();
      }
    }, 850);
  };

  return (
    <div id="home" className="min-h-screen bg-brand-bg font-sans text-neutral-900 overflow-x-hidden selection:bg-neutral-800 selection:text-white relative">
      
      {/* Background decoration with professional gradients */}
      <div className="absolute top-0 right-0 w-full h-[650px] bg-gradient-to-b from-[#f0f4ff] to-transparent pointer-events-none -z-10"></div>
      
      {/* Top Header */}
      <Header onNavigate={handleNavigate} />

      {/* Asymmetrical Frame Layout */}
      <div className="flex w-full">
        
        {/* Left fixed rail */}
        <SidebarRail onTriggerDemo={handleTriggerDemo} onNavigate={handleNavigate} />
        
        {/* Main flow wrapper: Offset offset by rail width on desktops */}
        <main className="flex-1 w-full ml-0 md:ml-20 min-w-0">
          
          {/* Section 0: Hero Showcase */}
          <section className="relative pt-16 md:pt-28 pb-20 overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-75 z-0"></div>
            
            {/* Glowing mesh accents */}
            <div className="absolute top-1/4 right-1/12 w-80 h-80 rounded-full bg-indigo-200/20 blur-[120px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/12 w-72 h-72 rounded-full bg-sky-200/20 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
              <div className="max-w-3xl flex flex-col items-start gap-8">
                
                {/* Tag item */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/5 box-content">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-brand-slate">BOOT_SUCCESS: SYSTEM_ACTIVE</span>
                </div>

                {/* Exact mockup statement typography */}
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-neutral-900 leading-[1.08] mb-6">
                    Muhammad Amir — <br/>
                    <span className="text-brand-slate font-medium">Helping Businesses Scale & Grow Using AI</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-md text-brand-slate font-sans leading-relaxed max-w-xl">
                    19-year-old developer specializing in intelligent AI-driven systems and client-focused digital upgrades. I build smart tools that make your business faster, larger, and more efficient.
                  </p>
                </div>

                {/* Primary Button pair */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto" id="hero-action-buttons">
                  <button
                    onClick={handleTriggerDemo}
                    id="explore-work-hero"
                    className="group w-full sm:w-auto py-3.5 px-6 rounded-lg bg-black text-white hover:bg-neutral-800 transition-all duration-350 flex items-center justify-center gap-3 font-mono text-xs font-semibold tracking-wider cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>Explore Work</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setIsResumeOpen(true)}
                    id="view-resume-hero"
                    className="w-full sm:w-auto py-3.5 px-6 rounded-lg bg-white text-neutral-800 hover:text-black hover:border-black/25 border border-black/5 transition-all duration-300 font-mono text-xs font-semibold tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-2.5"
                  >
                    <FileText className="w-4 h-4 text-brand-slate" />
                    <span className="underline decoration-neutral-300 hover:decoration-black underline-offset-4">View Resume</span>
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* Section 1: Interactive n8n Canvas */}
          <InteractiveCanvas />

          {/* Section 2: About Me Narrative & Timeline */}
          <AboutMe />

          {/* Section 3: Deployed Architectures Grid */}
          <ProjectSection />

          {/* Section 4: Live Message Deployment Hook */}
          <ContactPipeline />

          {/* Core Footer Segment matching mockup footer metadata */}
          <footer className="bg-white py-12 border-t border-black/[0.05]" id="footer">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Logo signature link */}
              <button 
                onClick={() => handleNavigate('home')}
                className="flex flex-col text-left cursor-pointer group"
              >
                <span className="text-md font-display font-black tracking-tight text-neutral-900 group-hover:text-black transition-colors">
                  MUHAMMAD AMIR
                </span>
                <span className="text-[9px] font-mono tracking-widest text-brand-slate uppercase font-medium">
                  BUILT FOR BUSINESS GROWTH
                </span>
              </button>

              <div className="text-[11px] font-mono text-brand-slate text-center md:text-right">
                <span>© 2026 MUHAMMAD AMIR. ALL RIGHTS RESERVED. LOCKDOWN WORKSPACE SECURE.</span>
              </div>

              {/* Decorative engineering icons from mockup bottom right */}
              <div className="flex items-center gap-4 text-neutral-400">
                <Terminal className="w-4 h-4 hover:text-neutral-800 transition-colors" title="Terminal Interface Status" />
                <Layers className="w-4 h-4 hover:text-neutral-800 transition-colors" title="Structured Layers count" />
                <Settings2 className="w-4 h-4 hover:text-neutral-800 transition-colors" title="Pipeline Configuration" />
              </div>

            </div>
          </footer>

        </main>
      </div>

      {/* Slide-over custom CV viewer inside application DOM */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="drawer-resume-modal">
          {/* Glass Overlay backdrop */}
          <div 
            onClick={() => setIsResumeOpen(false)}
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white shadow-2xl h-full flex flex-col z-10 animate-slide-in">
            {/* Drawer Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-black text-white rounded-lg">
                  <FileCode className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-neutral-900 font-mono">muhammad_amir_cv.json</h3>
                  <span className="text-[10px] text-brand-slate font-mono uppercase">Developer Profile Manifest</span>
                </div>
              </div>
              <button
                onClick={() => setIsResumeOpen(false)}
                className="p-2 rounded-lg text-brand-slate hover:bg-neutral-100 hover:text-neutral-900 transition-all cursor-pointer"
                title="Close Profile Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable manifested parameters content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 select-text">
              
              <div className="bg-neutral-900 text-teal-400 font-mono text-xs rounded-xl p-6 overflow-x-auto shadow-inner leading-relaxed">
                <div className="text-neutral-500 font-semibold select-none pb-2">// Automated Developer Spec Sheet</div>
                <pre id="json-resume-sheet">
{`{
  "engineer": "Muhammad Amir",
  "specialty": "Business Growth Engines / AI Systems Dev",
  "age": 19,
  "location": "Pakistan",
  "operational_since": 2022,
  "telemetry": {
    "workflows_built": 50,
    "scraping_pipelines": "Scalable & Self-Healing",
    "integration_platforms": ["Smart AI Workflows", "NodeJS", "Express"]
  },
  "core_competencies": {
    "orchestation": "Intelligent workflow logic & custom webhooks",
    "scraper_engineering": "Regex scraping, DOM parsed selectors, APIs",
    "integration_gateways": ["REST Webhook", "IMAP", "Google Sheets", "Slack API"],
    "ai_reasoning": "Gemini models, tailored local prompt wrappers"
  },
  "formal_status": "Student developer navigates self-taught parameters"
}`}
                </pre>
              </div>

              {/* Traditional Clean CV Print structure underneath */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-neutral-900 font-display">Core Competency Matrix</h4>
                  <p className="text-xs text-brand-slate mt-1 leading-relaxed">System interfaces engineered during the last 10 months of focus:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-neutral-50 border border-black/5">
                    <span className="text-xs font-bold text-neutral-900 font-mono block mb-1">Smart Custom Workflows</span>
                    <p className="text-xs text-brand-slate leading-relaxed">Expert set-up of intelligent routing systems and scheduled tasks that streamline client lead pipelines automatically.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-neutral-50 border border-black/5">
                    <span className="text-xs font-bold text-neutral-900 font-mono block mb-1">AI Agent Integration</span>
                    <p className="text-xs text-brand-slate leading-relaxed">Harnessing generative weights to process unstructured inbox pipelines, auto-categorize incoming data fields, and compile drafts.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <h4 className="text-sm font-bold text-neutral-900 font-display mb-3">Self-Taught Principles</h4>
                  <ul className="space-y-2 text-xs text-brand-slate leading-relaxed">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                      <span><strong>Asymmetrical Architecture:</strong> Custom-built interfaces keeping sensitive credentials fully client-hidden.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                      <span><strong>Deterministic Logic:</strong> Every workflow features strict type assertions and fallback branches to block loops.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>

            {/* Resume actions footer */}
            <div className="p-5 border-t border-black/5 bg-neutral-50 flex gap-3.5">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-lg bg-black text-white hover:bg-neutral-800 transition-all font-mono text-xs font-bold tracking-wider uppercase text-center cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Print spec profile</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
