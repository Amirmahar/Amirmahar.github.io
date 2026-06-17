import { useState, useEffect } from 'react';
import { Webhook, Code2, Bot, Play, CheckCircle2, RotateCcw, Terminal, Loader2, Sparkles } from 'lucide-react';

interface PayloadPreset {
  name: string;
  source: string;
  data: Record<string, any>;
}

const PRESETS: PayloadPreset[] = [
  {
    name: 'Google Maps Pipeline',
    source: 'Maps Scraper Webhook',
    data: {
      company: 'TechOps Solutions Ltd',
      website: 'techops-val.com',
      industry: 'Supply Chain Logistics',
      contactEmail: 'partner@techops-val.com',
      postalCode: '54000',
      region: 'Punjab, PK'
    }
  },
  {
    name: 'LinkedIn Lead Generator',
    source: 'Inbound Lead Hook',
    data: {
      name: 'Sarah Rahman',
      role: 'Director of Growth',
      company: 'AppScale Media',
      size: '50-200 employees',
      problemSubmitted: 'Manual report generation wastes 10h/week per analyst'
    }
  },
  {
    name: 'Customer Support Intake',
    source: 'Zendesk Custom Trigger',
    data: {
      ticketId: '9841',
      customerName: 'Asif Mahmud',
      priority: 'high',
      body: 'CRM sync of workflow triggered manually failed with status 403 on client database.'
    }
  }
];

export default function InteractiveCanvas() {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [pipelineState, setPipelineState] = useState<'idle' | 'webhook_triggering' | 'parsing' | 'agent_thinking' | 'success'>('idle');
  
  // Node steps substatuses
  const [nodeLog, setNodeLog] = useState<string[]>(['System Ready. Awaiting webhook trigger...']);
  const [parsedData, setParsedData] = useState<any>(null);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [progress, setProgress] = useState(0);

  // Active terminal timer
  useEffect(() => {
    let timer: any;
    if (pipelineState === 'webhook_triggering') {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((old) => {
          if (old >= 100) {
            clearInterval(timer);
            setPipelineState('parsing');
            log('Node "Webhook Trigger" processed in 124ms. Dispatching parsed schema to "Data Parser" node...');
            return 100;
          }
          return old + 20;
        });
      }, 200);
    } else if (pipelineState === 'parsing') {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((old) => {
          if (old >= 100) {
            clearInterval(timer);
            setPipelineState('agent_thinking');
            // Mocking the parser payload
            const presetData = PRESETS[selectedPreset].data;
            setParsedData({
              extracted_fields: Object.keys(presetData).length,
              source: PRESETS[selectedPreset].source,
              timestamp: new Date().toISOString(),
              normalized_lead: {
                target_entity: presetData.company || presetData.name,
                contact_hub: presetData.contactEmail || 'Sarah Rahman',
                category: presetData.industry || 'Lead Ops'
              }
            });
            log('Node "Data Parser" successfully extracted strict JSON. Initiating context-aware prompting on "AI Agent" node...');
            return 100;
          }
          return old + 12;
        });
      }, 150);
    } else if (pipelineState === 'agent_thinking') {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((old) => {
          if (old >= 100) {
            clearInterval(timer);
            setPipelineState('success');
            generateAIOutput();
            log('Node "AI Agent" execution finished. Output payload structured and pipeline marked green.');
            return 100;
          }
          return old + 8;
        });
      }, 200);
    }

    return () => clearInterval(timer);
  }, [pipelineState]);

  const log = (msg: string) => {
    setNodeLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleStartPipeline = () => {
    setParsedData(null);
    setAiResponse('');
    setNodeLog([`[${new Date().toLocaleTimeString()}] WEBHOOK INGESTION DETECTED: Source [${PRESETS[selectedPreset].source}]`]);
    setPipelineState('webhook_triggering');
  };

  const handleReset = () => {
    setPipelineState('idle');
    setParsedData(null);
    setAiResponse('');
    setNodeLog(['System Ready. Awaiting webhook trigger...']);
    setProgress(0);
  };

  const generateAIOutput = () => {
    const data = PRESETS[selectedPreset].data;
    if (selectedPreset === 0) {
      setAiResponse(
        `AI AGENT CLASSIFICATION: Lead Verified ✅\n\n` +
        `"Hey team, we just scraped and parsed TechOps Solutions Ltd. I generated this tailored Outreach email:\n\n` +
        `Subject: Optimizing pipeline latency for TechOps Solutions\n` +
        `Hi team at ${data.company}, we notice your regional logistics operation in ${data.region} could benefit from end-to-end webhook data automation to scrape and parse inbound tracking metrics instantly. Let's hop on a brief call."`
      );
    } else if (selectedPreset === 1) {
      setAiResponse(
        `AI AGENT CRON TASK SUCCESS: Outbound Prepared ✅\n\n` +
        `"Hello Sarah,\n` +
        `I noticed you manage growth at ${data.company} (${data.size}). Since ${data.problemSubmitted}, I propose implementing a robust, smart data sync that compiles leads automatically into your dashboard, reducing manual reporting from 10h to just 12 seconds."`
      );
    } else {
      setAiResponse(
        `AI AGENT TRIAGE COMPLETED: High Priority routing ✅\n\n` +
        `"Critical 403 authorization error identified on client db integration for user ${data.customerName}.\n` +
        `Action taken: Ticket #${data.ticketId} escalated. Auto-drafted response: 'Hi ${data.customerName}, our system detected an authentication issue. We are reviewing API scopes and CORS configurations immediately.'"`
      );
    }
  };

  return (
    <section id="work" className="py-20 bg-brand-bg relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 dot-grid z-0 opacity-85"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-teal-300/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-300/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 lg:px-16 flex flex-col">
        {/* Section Heading matching Amir's typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/5 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-brand-slate">LIVE_DEMO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-900 leading-tight">
              Visual Business Workflows
            </h2>
            <p className="text-base text-brand-slate font-sans mt-3 max-w-xl">
              See how it works in real-time. Interact with my live workspace below and test smart workflows designed to help your business grow.
            </p>
          </div>
          
          {/* Preset Selector */}
          <div className="flex flex-wrap gap-2 " id="presets-panel">
            {PRESETS.map((preset, idx) => (
              <button
                key={preset.name}
                id={`preset-[#${idx}]`}
                onClick={() => {
                  setSelectedPreset(idx);
                  handleReset();
                }}
                disabled={pipelineState !== 'idle'}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-lg border transition-all duration-300 disabled:opacity-50 ${
                  selectedPreset === idx
                    ? 'bg-black text-white border-black shadow-sm scale-[1.02]'
                    : 'bg-white/60 text-brand-slate border-black/5 hover:bg-white hover:border-black/20'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* The Live Interactive Canvas Board */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Trigger controller and payload visualizer */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card hover:border-black/10 transition-all rounded-xl p-6 flex flex-col gap-5 h-full relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
                  <span className="text-xs font-mono font-medium text-brand-slate uppercase tracking-wider">Payload Variables</span>
                </div>
                <span className="text-[10px] font-mono bg-black/5 text-neutral-700 px-2 py-0.5 rounded uppercase">JSON Form</span>
              </div>

              {/* JSON Payload View */}
              <div className="bg-neutral-900 text-neutral-100 rounded-lg p-4 font-mono text-xs overflow-x-auto selection:bg-teal-500/30 flex-1 leading-relaxed border border-white/5 shadow-inner">
                <div className="text-neutral-500 select-none pb-1 font-semibold text-[10px] uppercase tracking-wider">// Webhook Input Payload</div>
                <pre id="payload-content-raw" className="text-teal-300 whitespace-pre">
                  {JSON.stringify(PRESETS[selectedPreset].data, null, 2)}
                </pre>
              </div>

              {/* Ingress Controls */}
              <div className="flex gap-3">
                {pipelineState === 'idle' ? (
                  <button
                    onClick={handleStartPipeline}
                    id="trigger-webhook-btn"
                    className="flex-1 py-3 px-4 rounded-lg bg-black text-white hover:bg-neutral-800 font-mono text-xs font-semibold tracking-wide flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-md active:scale-98"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Fire Ingest Webhook</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    id="reset-webhook-btn"
                    className="flex-1 py-3 px-4 rounded-lg bg-white text-neutral-800 hover:text-black hover:border-black/20 border border-black/5 font-mono text-xs font-semibold tracking-wide flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-sm active:scale-98"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Cancel & Re-Initialize</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right panel: Live diagram canvas + log console */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Diagram Board */}
            <div className="glass-card rounded-xl p-8 flex flex-col justify-between items-center min-h-[300px] relative overflow-hidden shadow-sm" id="live-board-visualizer">
              <div className="absolute top-4 right-4 text-[10px] font-mono text-emerald-500 flex items-center gap-1.5 bg-emerald-50 px-2 py-1.5 rounded-full border border-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Link: Live Sandbox State</span>
              </div>
              
              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-around gap-12 py-8 relative">
                
                {/* SVG Connecting pipeline */}
                <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="trace-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="glowing-bead" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    
                    {/* Path 1: Trigger to Parser */}
                    <path
                      d="M 195 100 L 350 100"
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.06)"
                      strokeWidth="2"
                    />
                    
                    {/* Active Ingest Flow Laser */}
                    {pipelineState === 'webhook_triggering' && (
                      <line
                        x1="195" y1="100" x2="350" y2="100"
                        stroke="url(#glowing-bead)"
                        strokeWidth="3"
                        strokeDasharray="100%"
                        className="animate-draw"
                        style={{
                          strokeDasharray: '30 40',
                          animation: 'dash 1.2s linear infinite'
                        }}
                      />
                    )}

                    {/* Path 2: Parser to AI Agent */}
                    <path
                      d="M 475 100 L 610 100"
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.06)"
                      strokeWidth="2"
                    />

                    {/* Active AI flow Laser */}
                    {pipelineState === 'parsing' && (
                      <line
                        x1="475" y1="100" x2="610" y2="100"
                        stroke="url(#glowing-bead)"
                        strokeWidth="3"
                        strokeDasharray="100%"
                        className="animate-draw"
                        style={{
                          strokeDasharray: '30 40',
                          animation: 'dash 1.2s linear infinite'
                        }}
                      />
                    )}
                  </svg>
                </div>

                {/* Node 1: Webhook Ingest */}
                <div 
                  id="node-webhook-trigger"
                  className={`relative z-10 w-44 p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    pipelineState === 'webhook_triggering'
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg scale-105'
                      : pipelineState !== 'idle'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-white text-neutral-800 border-black/5 hover:border-black/15 shadow-sm'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg mb-2.5 ${
                    pipelineState === 'webhook_triggering' ? 'bg-teal-500/20 text-teal-300' : 'bg-neutral-50 border border-neutral-100 text-brand-slate'
                  }`}>
                    {pipelineState === 'webhook_triggering' ? (
                      <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                    ) : (
                      <Webhook className="w-5 h-5 text-neutral-900" />
                    )}
                  </div>
                  <span className="text-xs font-semibold font-mono tracking-wide">New Inquiry Ingest</span>
                  <span className="text-[10px] text-brand-slate font-sans mt-1">
                    {pipelineState === 'webhook_triggering' ? (
                      <span className="text-teal-400 font-mono animate-pulse">Ingesting... {progress}%</span>
                    ) : pipelineState !== 'idle' ? (
                      <span className="text-emerald-600 font-medium font-mono">Completed ✓</span>
                    ) : (
                      'Awaiting POST'
                    )}
                  </span>
                </div>

                {/* Node 2: Data Parser */}
                <div 
                  id="node-data-parser"
                  className={`relative z-10 w-44 p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    pipelineState === 'parsing'
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg scale-105'
                      : pipelineState === 'agent_thinking' || pipelineState === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-white text-neutral-800 border-black/5 shadow-sm'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg mb-2.5 ${
                    pipelineState === 'parsing' ? 'bg-violet-500/20 text-violet-300' : 'bg-neutral-50 border border-neutral-100 text-brand-slate'
                  }`}>
                    {pipelineState === 'parsing' ? (
                      <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                    ) : (
                      <Code2 className="w-5 h-5 text-neutral-900" />
                    )}
                  </div>
                  <span className="text-xs font-semibold font-mono tracking-wide">AI Data Organizer</span>
                  <span className="text-[10px] text-brand-slate font-sans mt-1">
                    {pipelineState === 'parsing' ? (
                      <span className="text-violet-400 font-mono animate-pulse">Parsing... {progress}%</span>
                    ) : pipelineState === 'agent_thinking' || pipelineState === 'success' ? (
                      <span className="text-emerald-600 font-medium font-mono">Parsed JSON ✓</span>
                    ) : (
                      'Awaiting Node 1'
                    )}
                  </span>
                </div>

                {/* Node 3: AI Agent */}
                <div 
                  id="node-ai-agent"
                  className={`relative z-10 w-44 p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    pipelineState === 'agent_thinking'
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg scale-105'
                      : pipelineState === 'success'
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-md'
                        : 'bg-white text-neutral-800 border-black/5 shadow-sm'
                  }`}
                >
                  {pipelineState === 'success' && (
                    <div className="absolute -top-1.5 -right-1.5 bg-emerald-400 text-emerald-950 p-1.5 rounded-full shadow border-2 border-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`p-2.5 rounded-lg mb-2.5 ${
                    pipelineState === 'agent_thinking' ? 'bg-amber-500/20 text-amber-300' : 'bg-neutral-50 border border-neutral-100 text-brand-slate'
                  }`}>
                    {pipelineState === 'agent_thinking' ? (
                      <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    ) : (
                      <Bot className="w-5 h-5 text-neutral-900" />
                    )}
                  </div>
                  <span className="text-xs font-semibold font-mono tracking-wide">AI Business Assistant</span>
                  <span className="text-[10px] text-brand-slate font-sans mt-1">
                    {pipelineState === 'agent_thinking' ? (
                      <span className="text-amber-400 font-mono animate-pulse">Thinking... {progress}%</span>
                    ) : pipelineState === 'success' ? (
                      <span className="text-emerald-200 font-medium font-mono">Response Generative</span>
                    ) : (
                      'Awaiting Node 2'
                    )}
                  </span>
                </div>

              </div>
              
              {/* Output Result Window or Flow steps */}
              <div className="w-full mt-4 pt-4 border-t border-black/5">
                {pipelineState === 'success' ? (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg animate-fade-in text-neutral-800" id="pipeline-final-output">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold font-mono text-emerald-800 uppercase tracking-wider">Node "AI Agent" Result Dispatched</span>
                    </div>
                    <pre className="text-xs font-mono font-medium whitespace-pre-wrap leading-relaxed text-neutral-800">
                      {aiResponse}
                    </pre>
                  </div>
                ) : pipelineState === 'idle' ? (
                  <div className="text-center py-2 text-xs text-brand-slate font-mono">
                    System Idle. Click <strong className="text-neutral-900">"Fire Ingest Webhook"</strong> to run simulation.
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 py-2 text-xs font-mono text-brand-slate">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline: processing structured tokens...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Live n8n Terminal logs */}
            <div className="bg-brand-dark/95 text-neutral-200 rounded-xl p-5 border border-white/10 shadow-lg flex flex-col font-mono" id="pipeline-logs-frame">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs font-bold uppercase text-neutral-400">Execution Log Console</span>
                </div>
                <span className="text-[10px] bg-white/10 text-white/75 border border-white/5 px-2 py-0.5 rounded tracking-widest font-mono">1.1.0_LATEST</span>
              </div>
              <div className="h-40 overflow-y-auto font-mono text-xs text-neutral-300 flex flex-col gap-1.5 leading-relaxed selection:bg-teal-700/50" id="logs-container">
                {nodeLog.map((logStr, i) => (
                  <div 
                    key={i} 
                    className={`pb-1 ${
                      logStr.includes('SUCCESS') || logStr.includes('successful') 
                        ? 'text-teal-400 font-semibold' 
                        : logStr.includes('INGESTION DETECTED') 
                          ? 'text-violet-400 font-semibold' 
                          : 'text-neutral-300'
                    }`}
                  >
                    {logStr}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
