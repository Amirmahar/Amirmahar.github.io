import { useState } from 'react';
import { ProjectItem } from '../types';
import { Brain, Layers, ChevronDown, ChevronUp, Clock, FileSpreadsheet, MapPin, Users, HeartHandshake, ArrowUpRight, FolderGit2 } from 'lucide-react';

const PROJECTS: ProjectItem[] = [
  {
    id: 'gmaps-scraper',
    title: 'Google Maps Email Scraper',
    subtitle: 'Automated data extraction pipeline compiling B2B contact lists directly from Maps API data.',
    tags: ['Smart Tools', 'Web Scraping'],
    icon: 'MapPin',
    metric: '94% scraping accuracy',
    flowSteps: [
      { name: 'Cron Trigger', type: 'Scheduler', status: 'success', action: 'Runs daily at 08:00' },
      { name: 'Maps API Fetch', type: 'HTTP Node', status: 'success', action: 'Queries location sectors' },
      { name: 'Email Extractor', type: 'Regex Service', status: 'success', action: 'Greps contact vectors' },
      { name: 'Sheets Exporter', type: 'Database Loader', status: 'success', action: 'Appends to Google Sheets' }
    ]
  },
  {
    id: 'linkedin-leadgen',
    title: 'LinkedIn Lead Gen',
    subtitle: 'Intelligent workflow identifying and collating high-value prospects based on complex search parameters.',
    tags: ['HTTP', 'APIs'],
    icon: 'Users',
    metric: '4x prospecting speed',
    flowSteps: [
      { name: 'Inbound Hook', type: 'Webhook', status: 'success', action: 'Receives target ICP filter' },
      { name: 'Lead Enrichment', type: 'FullContact Integration', status: 'success', action: 'Appends executive handles' },
      { name: 'Slack Dispatch', type: 'Notification Node', status: 'success', action: 'Alerts SDR team instantly' }
    ]
  },
  {
    id: 'linkedin-content',
    title: 'LinkedIn Content Automation',
    subtitle: 'End-to-end content generation and scheduling system. Integrates Gemini AI for drafting and scheduled automated posting.',
    tags: ['AI Agents', 'JavaScript'],
    icon: 'Brain',
    metric: 'Daily automated draft',
    flowSteps: [
      { name: 'CRON Trigger', type: 'CRON: 0 9 * * 1-5', status: 'active', action: 'Fires every weekday morning' },
      { name: 'Draft generator', type: 'Gemini Agent', status: 'active', action: 'Drafts technical workflows' },
      { name: 'Validation Queue', type: 'Trello Board Sync', status: 'idle', action: 'Pushes code block to QA card' },
      { name: 'Publish API', type: 'LinkedIn HTTP Node', status: 'idle', action: 'Dispatches raw text/image payload' }
    ]
  },
  {
    id: 'support-agent',
    title: 'Customer Support AI',
    subtitle: 'Context-aware conversational agent handling tier-1 inquiries before safely routing to human escalation queues.',
    tags: ['AI Agents'],
    icon: 'HeartHandshake',
    metric: '68% deflection rate',
    flowSteps: [
      { name: 'Inbound Mailbox', type: 'IMAP Trigger', status: 'success', action: 'Pulls incoming ticket body' },
      { name: 'Agent Intent Triage', type: 'Gemini Node', status: 'success', action: 'Classifies complaint urgency' },
      { name: 'CRM Resolver', type: 'REST Integration', status: 'success', action: 'Injects solution payload' }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst Agent',
    subtitle: 'Autonomous script that digests raw CSVs, normalizes outlier rows, and outputs formatted executive summaries.',
    tags: ['JavaScript'],
    icon: 'FileSpreadsheet',
    metric: '20s automated summaries',
    flowSteps: [
      { name: 'Payload Ingest', type: 'HTTP Ingress', status: 'success', action: 'Receives raw .csv file url' },
      { name: 'NodeJS Script v2', type: 'Code Engine', status: 'success', action: 'Normalizes columns in runtime' },
      { name: 'Auto-Report Sync', type: 'Notion Database Node', status: 'success', action: 'Appends markdown layout' }
    ]
  }
];

export default function ProjectSection() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="w-5 h-5 text-neutral-800" />;
      case 'Users': return <Users className="w-5 h-5 text-neutral-800" />;
      case 'Brain': return <Brain className="w-5 h-5 text-neutral-800" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-neutral-800" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-neutral-800" />;
      default: return <Layers className="w-5 h-5 text-neutral-800" />;
    }
  };

  const toggleExpandProject = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      {/* Visual Dot Grids inside margins */}
      <div className="absolute top-10 left-10 w-40 h-40 dot-grid z-0 opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 dot-grid z-0 opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/5 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-brand-slate">04_PROJECTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-900">
            Client Growth Systems
          </h2>
          <p className="text-base text-brand-slate font-sans mt-3 max-w-xl">
            I build intelligent and stable digital frameworks that solve real sales prospecting, market research, and automated content generation bottlenecks.
          </p>
        </div>

        {/* 2-Column Grid Layout matching mockup layout but with beautiful detail expansions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
          {PROJECTS.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`group flex flex-col justify-between p-6 md:p-8 rounded-xl border transition-all duration-300 ${
                  isExpanded
                    ? 'border-neutral-900 bg-brand-bg/60 shadow-md ring-1 ring-black/5'
                    : 'border-black/5 bg-white hover:border-black/15 shadow-sm'
                }`}
              >
                <div>
                  {/* Top line with Icon and Expand button */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center border border-black/5">
                      {getIcon(project.icon)}
                    </div>
                    {project.metric && (
                      <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-500/10">
                        {project.metric}
                      </span>
                    )}
                  </div>

                  {/* Title and details */}
                  <h3 className="text-xl font-display font-bold text-neutral-900 group-hover:text-black transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-brand-slate font-sans leading-relaxed mb-6">
                    {project.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-medium tracking-wide px-2.5 py-1 rounded bg-neutral-100 text-brand-slate uppercase border border-black/[0.03]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Content for LinkedIn Scheduling special card */}
                  {project.id === 'linkedin-content' && (
                    <div className="mb-6 p-4 rounded-lg bg-[#ffffff82] backdrop-blur border border-black/5 flex items-center justify-between" id="cron-visualizer">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-violet-500" />
                        <span className="text-xs font-mono font-semibold text-neutral-800">CRON: 0 9 * * 1-5</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping"></span>
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-violet-600">Active</span>
                      </div>
                    </div>
                  )}

                  {/* Hidden Node Blueprint content */}
                  {isExpanded && (
                    <div className="mt-4 pt-6 border-t border-black/5 animate-fade-in" id={`details-${project.id}`}>
                      <div className="text-[11px] font-mono uppercase font-extrabold tracking-wider text-neutral-500 mb-4">// System Logic Node Flow</div>
                      <div className="flex flex-col gap-3">
                        {project.flowSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-black/5">
                            <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="text-xs font-semibold font-mono text-neutral-900">{step.name}</span>
                                <span className="text-[10px] font-mono text-brand-slate bg-neutral-100 px-1.5 py-0.5 rounded">{step.type}</span>
                              </div>
                              <span className="text-xs text-brand-slate block mt-1">{step.action}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card footer CTA expand */}
                <button
                  onClick={() => toggleExpandProject(project.id)}
                  className="mt-6 pt-4 border-t border-black/[0.04] w-full flex items-center justify-between text-xs font-mono text-brand-slate hover:text-black transition-colors cursor-pointer group-hover:border-black/10"
                >
                  <span>{isExpanded ? 'Hide Interactive Flow Details' : 'View Smart System Logic'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            );
          })}

          {/* "More projects" tile — fills the trailing grid cell */}
          <a
            href="#contact"
            id="project-card-more"
            className="group flex flex-col justify-between p-6 md:p-8 rounded-xl border border-dashed border-black/15 bg-neutral-50/60 hover:border-black/40 hover:bg-neutral-50 transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                  <FolderGit2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-600 bg-white px-2.5 py-1 rounded-full border border-black/5">
                  20+ shipped
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-neutral-900 group-hover:text-black transition-colors mb-3">
                20+ More Projects
              </h3>
              <p className="text-sm text-brand-slate font-sans leading-relaxed mb-6">
                Scrapers, AI agents, and custom automation pipelines built for clients across different industries. Want the full breakdown for your use case?
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-mono font-medium tracking-wide px-2.5 py-1 rounded bg-white text-brand-slate uppercase border border-black/[0.06]">Automation</span>
                <span className="text-[10px] font-mono font-medium tracking-wide px-2.5 py-1 rounded bg-white text-brand-slate uppercase border border-black/[0.06]">AI Agents</span>
                <span className="text-[10px] font-mono font-medium tracking-wide px-2.5 py-1 rounded bg-white text-brand-slate uppercase border border-black/[0.06]">Scraping</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.04] w-full flex items-center justify-between text-xs font-mono text-neutral-900 font-semibold group-hover:border-black/10">
              <span>Request the full portfolio</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Technical Capabilities segment based on mockup bottom */}
        <div id="stack" className="mt-24 pt-16 border-t border-black/[0.05]">
          <h3 className="text-xs font-mono uppercase text-brand-slate font-extrabold tracking-widest mb-8">// Technical Capabilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="capabilities-grid">
            {[
              { label: 'Smart System Flows', color: 'bg-orange-500' },
              { label: 'REST APIs', color: 'bg-blue-500' },
              { label: 'Data Integrations', color: 'bg-emerald-500' },
              { label: 'Web Scraping', color: 'bg-violet-500' },
              { label: 'JavaScript', color: 'bg-amber-400' },
              { label: 'AI Agent Dev', color: 'bg-teal-500' }
            ].map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-black/5 hover:border-black/15 shadow-sm transition-all duration-200"
              >
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${skill.color} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${skill.color}`}></span>
                </span>
                <span className="text-sm font-semibold text-neutral-800 font-sans tracking-tight">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
