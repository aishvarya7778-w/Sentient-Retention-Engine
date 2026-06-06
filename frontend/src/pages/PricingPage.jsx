import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav } from '../components/landing/Nav';
import { Cursor } from '../components/landing/Cursor';
import { Check, X, Shield, Cpu, Terminal, ArrowRight, Activity, Zap, DollarSign, Send, HelpCircle, Database, Lock, AlertCircle } from 'lucide-react';

const PricingPage = () => {
  // Billing cycle state: 'monthly' | 'annual'
  const [billingCycle, setBillingCycle] = useState('annual');
  
  // Calculator metrics
  const [activeUsers, setActiveUsers] = useState(25000);
  const [churnRate, setChurnRate] = useState(5.5);
  const [improvementRate, setImprovementRate] = useState(22);
  const [ltv, setLtv] = useState(150);
  
  // ROI Results
  const [roiMetrics, setRoiMetrics] = useState({
    monthlyLoss: 0,
    monthlySaved: 0,
    annualSaved: 0,
    recommendedPlan: ''
  });

  // FAQ Expanded indices
  const [faqExpanded, setFaqExpanded] = useState({});

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
    volume: '10k-50k'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionLogs, setSubmissionLogs] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Recalculate ROI and determine recommended plan
  useEffect(() => {
    const monthlyLoss = Math.round(activeUsers * (churnRate / 100) * ltv);
    const monthlySaved = Math.round(monthlyLoss * (improvementRate / 100));
    const annualSaved = Math.round(monthlySaved * 12);
    
    let recommendedPlan = 'Sentinel Node';
    if (activeUsers <= 1000) {
      recommendedPlan = 'Developer Node';
    } else if (activeUsers > 50000) {
      recommendedPlan = 'Sentient Overlord';
    }

    setRoiMetrics({
      monthlyLoss,
      monthlySaved,
      annualSaved,
      recommendedPlan
    });
  }, [activeUsers, churnRate, improvementRate, ltv]);

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;
    
    setIsSubmitting(true);
    setSubmissionLogs([]);

    const logSteps = [
      { msg: 'INITIALIZING ENCRYPTED UPLINK TO CORE...', delay: 400 },
      { msg: 'RESOLVING MASTER DOMAIN FOR ORCHESTRATION...', delay: 800 },
      { msg: `PACKAGING CLIENT METRICS: USER_VOL=${activeUsers}, CHURN=${churnRate}%, EST_RET_GAIN=${improvementRate}%...`, delay: 1400 },
      { msg: 'VERIFYING SECURITY TOKENS & DOMAIN INTEGRITY...', delay: 1800 },
      { msg: 'UPLINK ESTABLISHED. SENDING RETENTION AUDIT REQUEST...', delay: 2400 },
      { msg: 'TRANSMISSION COMPLETE. EXPECT CONTACT WITHIN 6 CYCLES.', delay: 2900 }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        setSubmissionLogs((prev) => [...prev, step.msg]);
        if (step.msg.startsWith('TRANSMISSION COMPLETE')) {
          setIsSubmitting(false);
          setIsSubmitted(true);
        }
      }, step.delay);
    });
  };

  // Plans data
  const plans = [
    {
      id: 'developer',
      name: 'Developer Node',
      desc: 'High-fidelity sandbox instance designed for pilot integrations and testing.',
      priceMonthly: 0,
      priceAnnual: 0,
      popular: false,
      cta: 'Initialize Sandbox',
      features: [
        'Up to 1,000 monitored users',
        'Standard churn heuristics',
        'Standard Webhook relays',
        'Basic retention dashboard',
        'Public discord support'
      ]
    },
    {
      id: 'sentinel',
      name: 'Sentinel Node',
      desc: 'Active autonomous prevention cluster with dynamic workflows and real-time response.',
      priceMonthly: 99,
      priceAnnual: 79,
      popular: true,
      cta: 'Deploy Sentinel Node',
      features: [
        'Up to 10,000 monitored users',
        'AI-driven churn prediction',
        'Automated alert workflows',
        'Financial risk mapping',
        'Priority Slack relay support',
        '99.9% uptime SLA'
      ]
    },
    {
      id: 'overlord',
      name: 'Sentient Overlord',
      desc: 'Isolated dedicated model cluster with governance layers and extreme customization.',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      popular: false,
      cta: 'Provision Custom Cluster',
      features: [
        'Unlimited monitored users',
        'Dedicated ML model partition',
        'Human-in-the-loop authorization',
        'Advanced SOC-2 compliance layer',
        'Direct SLA & response guarantees',
        'Dedicated ML solution engineer'
      ]
    }
  ];

  // Feature Comparison matrix rows
  const comparisonMatrix = [
    { category: 'Scale & Inference', name: 'Monitored User Limit', dev: '1,000', sentinel: '10,000', overlord: 'Unlimited' },
    { category: 'Scale & Inference', name: 'Dedicated Inference GPU', dev: 'Shared', sentinel: 'Shared Priority', overlord: 'Isolated Node' },
    { category: 'Prediction & AI', name: 'Predictive Churn Engine', dev: 'Heuristic Baseline', sentinel: 'Active ANN Predictor', overlord: 'Custom Tuned ANN / LLM' },
    { category: 'Prediction & AI', name: 'Explainable AI Logs (XAI)', dev: '❌ No', sentinel: 'Standard Web Interface', overlord: 'Full Raw Log Streams' },
    { category: 'Workflows & Action', name: 'Autonomous Action Workflows', dev: '1 Playbook', sentinel: 'Unlimited Playbooks', overlord: 'Custom Node Trigger' },
    { category: 'Workflows & Action', name: 'Human-In-The-Loop Approval', dev: '❌ No', sentinel: '❌ No', overlord: '✅ Mandatory Gatekeeper' },
    { category: 'Security & SLA', name: 'Data Location Isolation', dev: 'Shared Cloud', sentinel: 'Shared Cloud', overlord: 'VPC / On-Prem / Cloud' },
    { category: 'Security & SLA', name: 'Uptime SLA Guarantee', dev: 'Best Effort', sentinel: '99.9% SLA', overlord: 'Up to 99.99% Custom' },
    { category: 'Support', name: 'Support Channel', dev: 'Discord / Community', sentinel: 'Priority Slack Relay', overlord: '24/7 Phone & Dedicated PM' }
  ];

  // FAQ items
  const faqs = [
    {
      q: 'How does the AI predict churn before it happens?',
      a: 'The Sentient-Retention Engine acts as an autonomous observer. It maps client interaction frequency, api load times, log session counts, and sentiment trends to feed our neural net (ANN). This calculates a real-time risk index, allowing the system to launch retention workflows immediately.'
    },
    {
      q: 'What is a "monitored user" under your plan metrics?',
      a: 'A monitored user is any active account whose events, API requests, or behavior logs are processed by the Sentient-Retention Engine within a given billing cycle. We do not count inactive/archived user databases.'
    },
    {
      q: 'Can we run custom retention models on our own infrastructure?',
      a: 'Yes. The Sentient Overlord plan supports on-premise execution or isolated VPC private node deployment. This guarantees that no user logs or predictive vectors leave your security boundary.'
    },
    {
      q: 'How does the billing cycle discount work?',
      a: 'When choosing annual billing, you receive an immediate 20% discount on Sentinel Node services, billed as a one-time yearly sequence. Developer Nodes remain free indefinitely.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans relative">
      <Cursor />
      <Nav />

      {/* Cyber SOC Background HUD elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hud-grid opacity-30"></div>
        <div className="hud-scanline opacity-10"></div>
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#c5f82a]/3 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-[#00e0ff]/3 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Header Hero Section - Typographic Brutalism */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c5f82a]/10 border border-[#c5f82a]/20 font-mono text-[10px] text-[#c5f82a] uppercase tracking-widest">
            <Activity size={10} className="animate-pulse" />
            System Node pricing matrix
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white uppercase leading-none">
            Scale your <span className="text-iris">Retention</span> Node
          </h1>
          <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-[0.2em] max-w-xl mx-auto">
            Choose the capacity for your active customer base. Zero hidden variables. Real-time inference deployment.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-8 flex justify-center">
            <div className="inline-flex items-center bg-[#0d0d0d] border border-zinc-800/80 p-1 rounded-none select-none">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-[#c5f82a] text-[#050505] font-black'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-[#c5f82a] text-[#050505] font-black'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                <span>Annual billing</span>
                <span className={`text-[9px] px-1.5 py-0.5 font-bold uppercase ${
                  billingCycle === 'annual' ? 'bg-[#050505] text-[#c5f82a]' : 'bg-[#c5f82a]/10 text-[#c5f82a]'
                }`}>
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 items-stretch">
          {plans.map((plan) => {
            const isEnterprise = typeof plan.priceMonthly === 'string';
            const currentPrice = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            const isRecommended = roiMetrics.recommendedPlan === plan.name;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between border transition-all duration-300 p-8 ${
                  plan.popular
                    ? 'bg-[#0f1712]/30 border-[#c5f82a] shadow-[0_0_30px_rgba(197,248,42,0.08)]'
                    : 'bg-[#0d0d0d]/80 border-zinc-800/80 hover:border-zinc-700/80'
                } ${
                  isRecommended ? 'ring-1 ring-[#c5f82a]/50 ring-offset-4 ring-offset-background' : ''
                }`}
              >
                {/* Visual Recommendation Indicator */}
                {isRecommended && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#c5f82a] text-[#050505] font-mono text-[9px] font-black uppercase tracking-widest">
                    Recommended ROI match
                  </div>
                )}

                {plan.popular && !isRecommended && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#00e0ff] text-[#050505] font-mono text-[9px] font-black uppercase tracking-widest">
                    Most popular config
                  </div>
                )}

                {/* Card Header */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-display font-bold text-white tracking-wider uppercase">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="w-2.5 h-2.5 bg-[#c5f82a] rounded-full animate-ping"></span>
                    )}
                  </div>
                  
                  <p className="text-zinc-500 text-xs min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="pt-4 pb-2 border-b border-zinc-800/80">
                    {isEnterprise ? (
                      <span className="text-3xl font-display font-black text-white uppercase tracking-wider">
                        {plan.priceMonthly}
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-zinc-500 font-mono font-bold">$</span>
                        <span className="text-5xl font-display font-black text-white tracking-tight">
                          {currentPrice}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">/mo</span>
                      </div>
                    )}
                    <div className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">
                      {isEnterprise ? 'custom integration scope' : billingCycle === 'annual' ? 'Billed annually' : 'Billed monthly'}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-4 pt-4">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-zinc-300">
                        <Check size={14} className="text-[#c5f82a] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-10">
                  {isEnterprise ? (
                    <a
                      href="#contact-terminal"
                      className="w-full py-4 text-center font-mono text-xs font-bold uppercase tracking-wider bg-white text-[#050505] hover:bg-[#c5f82a] transition-all flex items-center justify-center gap-2"
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Link
                      to={`/signup?plan=${plan.id}&billing=${billingCycle}`}
                      className={`w-full py-4 text-center font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-[#c5f82a] text-[#050505] hover:shadow-[0_0_20px_rgba(197,248,42,0.3)]'
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive ROI Cost Calculator */}
        <div className="border border-zinc-800/80 bg-[#070707] p-8 lg:p-12 mb-32 relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* HUD Tech Borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c5f82a]/30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#c5f82a]/30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#c5f82a]/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c5f82a]/30" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            
            {/* Left Inputs Panel */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wider uppercase flex items-center gap-3">
                  <Cpu size={18} className="text-[#c5f82a] animate-pulse" />
                  Predictive ROI Simulator
                </h3>
                <p className="text-zinc-500 text-xs mt-1 font-mono uppercase">
                  Map your churn metrics to evaluate node deployment outcomes.
                </p>
              </div>

              {/* Sliders Container */}
              <div className="space-y-6 pt-4">
                
                {/* Slider 1: Active Users */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] uppercase">
                    <span className="text-zinc-400">Active monitored users</span>
                    <span className="text-[#c5f82a] font-bold">{(activeUsers).toLocaleString()} users</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={activeUsers}
                    onChange={(e) => setActiveUsers(parseInt(e.target.value))}
                    className="w-full accent-[#c5f82a] bg-zinc-900 h-1.5 focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                    <span>1k</span>
                    <span>50k</span>
                    <span>100k+</span>
                  </div>
                </div>

                {/* Slider 2: Current Churn */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] uppercase">
                    <span className="text-zinc-400">Current monthly churn rate</span>
                    <span className="text-[#00e0ff] font-bold">{churnRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={churnRate}
                    onChange={(e) => setChurnRate(parseFloat(e.target.value))}
                    className="w-full accent-[#00e0ff] bg-zinc-900 h-1.5 focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                    <span>1%</span>
                    <span>10%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Slider 3: Churn Reduction */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] uppercase">
                    <span className="text-zinc-400">Target churn reduction</span>
                    <span className="text-[#c5f82a] font-bold">{improvementRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={improvementRate}
                    onChange={(e) => setImprovementRate(parseInt(e.target.value))}
                    className="w-full accent-[#c5f82a] bg-zinc-900 h-1.5 focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                    <span>5%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Slider 4: Average LTV */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] uppercase">
                    <span className="text-zinc-400">Average customer lifetime value (LTV)</span>
                    <span className="text-white font-bold">${ltv}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={ltv}
                    onChange={(e) => setLtv(parseInt(e.target.value))}
                    className="w-full accent-white bg-zinc-900 h-1.5 focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                    <span>$50</span>
                    <span>$500</span>
                    <span>$1,000</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Diagnostic Panel */}
            <div className="lg:col-span-5 bg-[#0b0b0b] border border-zinc-800 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Diagnostic output</span>
                  <span className="text-[9px] font-mono text-[#c5f82a] bg-[#c5f82a]/10 px-2 py-0.5 uppercase tracking-widest animate-pulse">
                    Live telemetry
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">Estimated annual revenue leak</div>
                    <div className="text-2xl font-display font-bold text-zinc-400 tracking-wide pt-1">
                      ${(roiMetrics.monthlyLoss * 12).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#c5f82a] font-mono uppercase font-bold">Estimated annual saved revenue</div>
                    <div className="text-4xl font-display font-black text-[#c5f82a] tracking-tight pt-1">
                      ${roiMetrics.annualSaved.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">Calculated node size match</div>
                    <div className="text-md font-mono font-bold text-[#00e0ff] pt-1 flex items-center gap-2">
                      <Database size={14} />
                      {roiMetrics.recommendedPlan}
                    </div>
                  </div>
                </div>
              </div>

              {/* Log simulation text */}
              <div className="mt-8 border-t border-zinc-800/80 pt-6 space-y-2">
                <div className="font-mono text-[9px] text-zinc-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c5f82a] rounded-full animate-ping"></span>
                  <span>SIM_INFERENCE_OK: Saved {Math.round(activeUsers * (churnRate / 100) * (improvementRate / 100))} operators/mo</span>
                </div>
                <div className="font-mono text-[9px] text-zinc-600">
                  SYSTEM_OPTIMIZATION_ROI: {((roiMetrics.annualSaved / (roiMetrics.recommendedPlan === 'Sentinel Node' ? 948 : 5000)) * 100).toFixed(0)}% EST
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Technical Capabilities Matrix */}
        <div className="mb-32">
          <div className="mb-10 text-center lg:text-left space-y-2">
            <h3 className="text-2xl font-display font-bold text-white tracking-wider uppercase">
              Technical capability breakdown
            </h3>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
              Exact configuration details across the entire deployment layer.
            </p>
          </div>

          <div className="overflow-x-auto border border-zinc-800/80">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-zinc-800/80 bg-[#0d0d0d]">
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest w-1/3">Capability</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Developer Node</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sentinel Node</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sentient Overlord</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-zinc-800/40 hover:bg-zinc-900/10 transition-colors"
                  >
                    <td className="p-4 font-sans text-zinc-300">
                      <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider pb-1">{row.category}</div>
                      <div className="font-bold text-white">{row.name}</div>
                    </td>
                    <td className="p-4 text-zinc-400">{row.dev}</td>
                    <td className="p-4 text-[#00e0ff] font-bold">{row.sentinel}</td>
                    <td className="p-4 text-[#c5f82a] font-bold">{row.overlord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise Node Contact Terminal */}
        <div id="contact-terminal" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00e0ff]/10 border border-[#00e0ff]/20 font-mono text-[10px] text-[#00e0ff] uppercase tracking-widest">
              <Lock size={10} className="animate-pulse" />
              Secure cluster initialization
            </div>
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-wider">
              Secure custom deployment
            </h2>
            <p className="text-zinc-500 text-xs max-w-md">
              Need custom model parameters, multi-tenant compliance, or isolated hardware environments? Initialize a secure request to deploy a dedicated Sentient cluster.
            </p>

            <div className="border border-zinc-800/80 p-6 space-y-4 bg-[#070707] font-mono text-[11px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                <span>Active link channel: TLS_V1.3_SECURE</span>
              </div>
              <p>
                Our engineering team will assess your logs volume and customize target predictors to map optimal retention workflows.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 border border-zinc-800/80 bg-[#070707] relative">
            <div className="absolute top-0 left-0 w-full bg-[#0d0d0d] border-b border-zinc-800/80 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff3e3e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffb800]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#c5f82a]"></div>
              </div>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">sentient_uplink.sh</span>
            </div>

            <div className="p-8 pt-12">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Operator name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-[#0d0d0d] border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-[#c5f82a] font-mono"
                          placeholder="Commander Raghuvanshi"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Secure email</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-[#0d0d0d] border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-[#c5f82a] font-mono"
                          placeholder="raghuvanshi@sec.net"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Corporate entity</label>
                        <input
                          type="text"
                          required
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          className="w-full bg-[#0d0d0d] border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-[#c5f82a] font-mono"
                          placeholder="Sentinel Security Corp"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Monthly active users</label>
                        <select
                          value={contactForm.volume}
                          onChange={(e) => setContactForm({ ...contactForm, volume: e.target.value })}
                          className="w-full bg-[#0d0d0d] border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-[#c5f82a] font-mono"
                        >
                          <option value="1k-10k">Under 10,000</option>
                          <option value="10k-50k">10,000 - 50,000</option>
                          <option value="50k-250k">50,000 - 250,000</option>
                          <option value="250k+">Above 250,000</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase">Operational requirements / scope</label>
                      <textarea
                        rows="4"
                        value={contactForm.notes}
                        onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                        className="w-full bg-[#0d0d0d] border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-[#c5f82a] font-mono resize-none"
                        placeholder="Need isolated VPC cluster deployment in AWS-EU region..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#c5f82a] text-[#050505] font-mono font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(197,248,42,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Establishing link...</span>
                      ) : (
                        <>
                          <span>Transmit Request payload</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6 py-6"
                  >
                    <div className="flex items-center gap-3 text-[#c5f82a] font-mono text-xs font-bold uppercase">
                      <Check size={16} />
                      Payload transmitted successfully
                    </div>
                    <div className="bg-[#050505] p-6 border border-zinc-800 font-mono text-[10px] text-zinc-400 space-y-2 max-h-[200px] overflow-y-auto">
                      {submissionLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
                          <span className={idx === submissionLogs.length - 1 ? 'text-[#c5f82a]' : ''}>{log}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setContactForm({ name: '', email: '', company: '', notes: '', volume: '10k-50k' });
                      }}
                      className="py-2.5 px-6 border border-zinc-800 hover:border-zinc-600 text-zinc-400 font-mono text-xs uppercase tracking-wider"
                    >
                      Reset terminal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-12 space-y-2">
            <h3 className="text-2xl font-display font-bold text-white tracking-wider uppercase flex items-center justify-center gap-3">
              <HelpCircle className="text-[#c5f82a]" />
              FAQ Database
            </h3>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
              General queries regarding core processing and integration parameters.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = !!faqExpanded[idx];
              return (
                <div
                  key={idx}
                  className="border border-zinc-800/85 bg-[#0d0d0d]/40"
                >
                  <button
                    onClick={() => setFaqExpanded({ ...faqExpanded, [idx]: !isExpanded })}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-zinc-900/10 transition-colors"
                  >
                    <span className="font-display text-sm font-bold text-white uppercase tracking-wider">
                      {faq.q}
                    </span>
                    <span className={`text-[#c5f82a] font-mono transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
                      ＋
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-zinc-900"
                      >
                        <div className="p-6 text-xs text-zinc-400 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
