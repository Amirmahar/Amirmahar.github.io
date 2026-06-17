import { useState } from 'react';
import { Menu, X, Code2, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Work', target: 'work' },
    { label: 'Projects', target: 'projects' },
    { label: 'Stack', target: 'stack' },
    { label: 'Experience', target: 'experience' },
  ];

  const handleItemClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 right-0 w-full bg-white/70 backdrop-blur-xl border-b border-[#000000]/[0.05] z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-18 flex items-center justify-between">
        {/* Left Side: Logo Branding */}
        <button 
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="flex flex-col">
            <span className="text-xl font-display font-extrabold tracking-tight text-neutral-900 group-hover:text-black transition-colors duration-200">
              MUHAMMAD AMIR
            </span>
            <span className="text-[10px] font-mono tracking-widest text-brand-slate uppercase font-medium">
              AI & Systems Developer
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.target)}
              className="text-sm font-sans font-medium text-brand-slate hover:text-black tracking-normal transition-colors py-1 relative group cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          ))}
        </nav>

        {/* Right Side: Primary Call To Action */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleItemClick('contact')}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-xs font-mono font-medium tracking-wide hover:bg-neutral-800 transition-all duration-350 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => handleItemClick('contact')}
            className="px-3 py-2 rounded-lg bg-black text-white text-[11px] font-mono font-medium tracking-wide hover:bg-neutral-800 transition-all duration-350"
          >
            Connect
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-slate hover:bg-black/5 hover:text-black transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 flex flex-col py-6 px-6 gap-4 shadow-xl animate-fade-in z-50">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.target)}
              className="flex items-center justify-between py-2.5 text-base font-semibold text-neutral-800 hover:text-black border-b border-black/5 text-left"
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-brand-slate">/0{menuItems.indexOf(item) + 1}</span>
            </button>
          ))}
          <button
            onClick={() => handleItemClick('contact')}
            className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-black text-white font-mono text-sm font-medium tracking-wide"
          >
            <span>Get in touch</span>
            <Code2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
