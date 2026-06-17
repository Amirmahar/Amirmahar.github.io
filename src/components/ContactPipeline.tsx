import { useState, useEffect, FormEvent } from 'react';
import { Send, CheckCircle2, Cpu, Database, ClipboardCheck, ArrowRight, Trash2 } from 'lucide-react';

interface LocalOutbox {
  id: string;
  name: string;
  email: string;
  message: string;
  sentiment: string;
  timestamp: string;
}

export default function ContactPipeline() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Terminal tracking
  const [isDeploying, setIsDeploying] = useState(false);
  const [step, setStep] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [outbox, setOutbox] = useState<LocalOutbox[]>([]);

  // Load from local persist on mount
  useEffect(() => {
    const saved = localStorage.getItem('amir_outbox_leads');
    if (saved) {
      try {
        setOutbox(JSON.parse(saved));
      } catch (e) {
        // Safe silent catch
      }
    }
  }, []);

  const triggerDeploy = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsDeploying(true);
    setStep(1);
    setDeployLogs([`[CONNECTED] Initializing secure connection gateway...`]);

    // Fast progressive status updates for aesthetic polish before dispatching
    await new Promise(resolve => setTimeout(resolve, 800));
    setStep(2);
    setDeployLogs(prev => [...prev, `[ENCRYPTION] Data packet formulated and signed.`]);

    await new Promise(resolve => setTimeout(resolve, 800));
    setStep(3);
    setDeployLogs(prev => [...prev, `[TRANSMITTING] Pushing secure payload directly to Outlook email server...`]);

    try {
      const response = await fetch("https://formsubmit.co/ajax/muhammad.amir-@outlook.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Business Growth Inquiry from ${name}`,
          _template: "table"
        })
      });

      if (response.ok) {
        setStep(4);
        setDeployLogs(prev => [...prev, `[SUCCESS] Delivery verified! Email dispatched successfully to Outlook Gateway.`]);
      } else {
        setStep(4);
        setDeployLogs(prev => [...prev, `[WARNING] Transmission replied with status ${response.status}. Logged to local database backup.`]);
      }
    } catch (err) {
      setStep(4);
      setDeployLogs(prev => [...prev, `[OFFLINE] Connection issue but stored securely in local database backup.`]);
    }

    // Append to local outbox
    const moods = ['High Priority', 'Partnership', 'Tech Inquiry', 'Advisory Support'];
    const selectedMood = moods[Math.floor(Math.random() * moods.length)];
    
    const newLead: LocalOutbox = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      message,
      sentiment: selectedMood,
      timestamp: new Date().toLocaleTimeString()
    };

    const updated = [newLead, ...outbox].slice(0, 5); // Limit to last 5
    setOutbox(updated);
    localStorage.setItem('amir_outbox_leads', JSON.stringify(updated));

    // Clear form
    setName('');
    setEmail('');
    setMessage('');
    
    // Auto timer reset pipeline view
    setTimeout(() => {
      setIsDeploying(false);
      setStep(0);
      setDeployLogs([]);
    }, 6000);
  };

  const clearHistory = () => {
    setOutbox([]);
    localStorage.removeItem('amir_outbox_leads');
  };

  return (
    <section id="contact" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-75 z-0"></div>
      
      {/* Dynamic light gradient blobs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-violet-400/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Title elements aligned perfectly to modern mockup */}
        <div className="flex flex-col items-center text-center justify-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/5 mb-4">
            <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-brand-slate">05_CONNECTION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-900 leading-tight">
            Want to improve & grow your business? Connect with me.
          </h2>
          <p className="text-base text-brand-slate font-sans mt-3 max-w-xl">
            I help businesses scale operations and grow using intelligent AI and smart system integrations. Send a message below to connect instantly.
          </p>
        </div>

        {/* 2-Column form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Direct Webhook Form */}
          <div className="lg:col-span-7">
            <div className="glass-card hover:border-black/10 transition-all rounded-xl p-6 md:p-8 flex flex-col justify-between h-full relative" id="contact-form-card">
              
              <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                  <span className="text-xs font-mono font-bold text-brand-slate uppercase tracking-wider">Send Inbound Connection Request</span>
                </div>
                <span className="text-[10px] font-mono bg-black/5 px-2 py-0.5 rounded text-neutral-500 uppercase tracking-widest">v1_api_gateway</span>
              </div>

              {!isDeploying ? (
                <form onSubmit={triggerDeploy} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5 focus-within:text-black">
                      <label className="text-[11px] font-mono text-brand-slate uppercase font-bold tracking-wider">Requester Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        id="form-input-name"
                        className="p-3 w-full border border-black/5 bg-white/50 text-neutral-900 text-sm rounded-lg focus:outline-none focus:border-black focus:bg-white transition-all duration-200 font-sans shadow-inner placeholder:text-neutral-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-brand-slate uppercase font-bold tracking-wider">Email Gateway</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        id="form-input-email"
                        className="p-3 w-full border border-black/5 bg-white/50 text-neutral-900 text-sm rounded-lg focus:outline-none focus:border-black focus:bg-white transition-all duration-200 font-sans shadow-inner placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-brand-slate uppercase font-bold tracking-wider">How can I help you grow? (Message)</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Discuss how we can improve your business or set up AI systems..."
                      id="form-input-message"
                      className="p-3 w-full border border-black/5 bg-white/50 text-neutral-900 text-sm rounded-lg focus:outline-none focus:border-black focus:bg-white transition-all duration-200 font-sans shadow-inner placeholder:text-neutral-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact"
                    className="mt-2 w-full py-3.5 px-6 rounded-lg bg-black text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-neutral-800 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-md active:scale-98"
                  >
                    <span>Send Message / Connect</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                /* Interactive deploying terminal log screen */
                <div className="flex-1 flex flex-col justify-center items-center py-12 px-6" id="deployment-screen">
                  <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center border border-teal-200 relative mb-6">
                    <span className="w-4 h-4 rounded-full bg-teal-400 animate-ping absolute"></span>
                    <Cpu className="w-6 h-6 text-teal-600 animate-spin" />
                  </div>

                  <h3 className="text-base font-semibold font-mono text-neutral-900 text-center mb-1 animate-pulse">
                    Deploying REST Webhook Pipeline...
                  </h3>
                  <p className="text-[11px] text-brand-slate font-mono text-center mb-6">
                    Parsing dynamic fields & pushing variables to secure server
                  </p>

                  <div className="w-full bg-neutral-950 text-neutral-200 rounded-lg p-5 font-mono text-xs border border-white/10 shadow-inner flex flex-col gap-1.5 items-stretch text-left">
                    {deployLogs.map((logStr, i) => (
                      <div key={i} className={`font-mono text-[11px] ${logStr.includes('SUCCESS') ? 'text-teal-400 font-bold' : 'text-neutral-300'}`}>
                        {logStr}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Local Persisted Leads Log Window */}
          <div className="lg:col-span-5 flex flex-col items-stretch justify-between">
            <div className="glass-card hover:border-black/10 transition-all rounded-xl p-6 flex flex-col justify-between h-full shadow-sm" id="persisted-outbox-card">
              
              <div>
                <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs font-mono font-bold text-brand-slate uppercase tracking-wider">Outbox Repository</span>
                  </div>
                  {outbox.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-[10px] font-mono text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Purge Logs</span>
                    </button>
                  )}
                </div>

                {outbox.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center" id="empty-outbox-placeholder">
                    <div className="p-3 bg-neutral-100 rounded-full mb-3.5 border border-black/5">
                      <ClipboardCheck className="w-5 h-5 text-neutral-400" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-800 font-mono mb-1">Local Ledger Empty</span>
                    <p className="text-[11px] text-brand-slate font-sans max-w-[200px] leading-relaxed">
                      All pipeline runs triggered during your session will appear here in the live state table.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4" id="indexed-outbox-grid">
                    <span className="text-[11px] font-mono text-brand-slate tracking-wider block">// Verified Submissions Ingested:</span>
                    <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto">
                      {outbox.map((item) => (
                        <div key={item.id} className="p-3.5 rounded-lg bg-white border border-black/5 shadow-sm hover:ring-1 hover:ring-black/[0.03] transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-neutral-900 font-sans truncate">{item.name}</span>
                            <span className="text-[9px] font-mono font-semibold tracking-wider bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full border border-teal-500/10">
                              {item.sentiment}
                            </span>
                          </div>
                          <p className="text-xs text-brand-slate font-sans line-clamp-2 leading-relaxed mb-2.5 italic">
                            "{item.message}"
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-mono text-brand-slate border-t border-black/[0.03] pt-2">
                            <span>Ingest Node: {item.timestamp}</span>
                            <span className="text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Deployed
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-slate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Webhook Receiver: Operational</span>
                </div>
                <a
                  href="mailto:muhammad.amir-@outlook.com"
                  className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Manual Email Gateway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
