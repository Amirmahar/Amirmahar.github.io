import { useEffect, useState } from 'react';
import { Home, Workflow, Cpu, Terminal, Play } from 'lucide-react';

interface SidebarRailProps {
  onTriggerDemo: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function SidebarRail({ onTriggerDemo, onNavigate }: SidebarRailProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'projects', 'stack', 'contact'];
      let current = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'work', icon: Workflow, label: 'Live Demo' },
    { id: 'projects', icon: Play, label: 'Projects' },
    { id: 'stack', icon: Cpu, label: 'Tech Stack' },
  ];

  return (
    <>
      {/* Desktop Asymmetrical Sidebar Rail: 80px width, fixed left */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-20 flex-col items-center justify-between py-8 border-r border-[#000000]/[0.05] bg-white/70 backdrop-blur-md z-30">
        {/* Top Indicator */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center border border-black/5 hover:border-black/20 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-black"></span>
          </div>
        </div>

        {/* Mid Navigation Links */}
        <nav className="flex flex-col items-center gap-6" id="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-black text-white shadow-sm scale-110' 
                    : 'text-brand-slate hover:bg-black/5 hover:text-black'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 transition-transform group-hover:scale-105" />
                
                {/* Tooltip */}
                <span className="absolute left-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left duration-200 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none font-mono">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Vertical Indicator Section */}
        <div className="flex flex-col items-center gap-8">
          <button 
            id="sidebar-run-trigger"
            onClick={onTriggerDemo}
            className="p-3 rounded-full bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white transition-all duration-300 cursor-pointer group"
            title="Start Interactive Pipeline Demo"
          >
            <Play className="w-4 h-4 fill-current animate-pulse group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2 transform -rotate-90 origin-center py-4 mb-4 select-none">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] font-semibold text-brand-slate whitespace-nowrap uppercase">
              SYSTEM_ACTIVE
            </span>
          </div>
        </div>
      </aside>

      {/* Floating Interactive Trigger Button for all sizes */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={onTriggerDemo}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-teal-500 text-white shadow-xl hover:bg-teal-600 active:scale-95 transition-all duration-200"
        >
          <Play className="w-4 h-4 fill-current" />
          <span className="text-xs font-mono font-medium tracking-wider">TRIGGER DEMO</span>
        </button>
      </div>
    </>
  );
}
