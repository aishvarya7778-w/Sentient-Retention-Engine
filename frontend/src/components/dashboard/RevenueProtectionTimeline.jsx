import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Layers, 
  Activity, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  ArrowRight,
  Clock,
  User,
  RefreshCw
} from 'lucide-react';

const MOCK_CUSTOMERS = [
  {
    id: 'CUST-8924-Alpha',
    name: 'Acme Corp',
    industry: 'Cloud Infrastructure',
    arr: 124500,
    riskBefore: '92%',
    riskAfter: '8%',
    driver: 'High API Latency & Competitive Pricing',
    status: 'COMPLETED',
    color: '#c5f82a',
    steps: [
      {
        time: '09:12',
        title: 'Customer Risk Detected',
        agent: 'XGBoostClassifier',
        confidence: '94.2%',
        icon: <Shield size={14} />,
        status: 'CRITICAL',
        color: 'text-red-400 border-red-500/30 bg-red-500/5',
        details: 'Anomaly detected: 42% spike in API latency drop-offs overlapping with a contract expiration date in 45 days.',
        impact: 'Potential Loss: $124,500 ARR'
      },
      {
        time: '09:13',
        title: 'AI Churn Analysis Completed',
        agent: 'RiskAnalysisAgent',
        confidence: '96.8%',
        icon: <Activity size={14} />,
        status: 'DIAGNOSED',
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
        details: 'Identified root cause: Client attempted to export database 3 times in 48 hours. Aggregated health score dropped to 28/100.',
        impact: 'Churn Driver: Technical Friction'
      },
      {
        time: '09:14',
        title: 'Retention Strategy Generated',
        agent: 'StrategyPlanningAgent',
        confidence: '89.5%',
        icon: <Layers size={14} />,
        status: 'STRATEGIZED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Formulated intervention bundle: 1. Auto-provision VIP routing lane (resolves latency). 2. Offer 15% multi-year renewal incentive.',
        impact: 'Incentive Cost: $18,675 ARR'
      },
      {
        time: '09:15',
        title: 'Simulation Completed',
        agent: 'SimulationAgent',
        confidence: '91.2%',
        icon: <Cpu size={14} />,
        status: 'SIMULATED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Ran 1,000 Monte Carlo runs. Predicted renewal probability rose from 12% to 94% with latency resolution + discount combination.',
        impact: 'ROI Forecast: +312%'
      },
      {
        time: '09:16',
        title: 'Intervention Approved',
        agent: 'GovernanceEngine',
        confidence: '99.9%',
        icon: <Shield size={14} />,
        status: 'APPROVED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Governance check passed: Auto-refunded SLA credit ($2,500). Slack alert broadcasted to Account Executive.',
        impact: 'Clearance: Alpha-Level Protocol'
      },
      {
        time: '09:18',
        title: 'Customer Retained',
        agent: 'ActionAgent',
        confidence: '100%',
        icon: <Zap size={14} />,
        status: 'SUCCESS',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Multi-year agreement signed. Latency drop-offs resolved within 10ms. Health score restored to 88/100.',
        impact: 'Protected Revenue: $124,500 ARR'
      }
    ]
  },
  {
    id: 'CUST-2219-Delta',
    name: 'Globex Corporation',
    industry: 'Fintech SaaS',
    arr: 89000,
    riskBefore: '85%',
    riskAfter: '12%',
    driver: 'Support Ticket Backlog & Feature Gap',
    status: 'COMPLETED',
    color: '#60a5fa',
    steps: [
      {
        time: '14:05',
        title: 'Customer Risk Detected',
        agent: 'XGBoostClassifier',
        confidence: '88.5%',
        icon: <Shield size={14} />,
        status: 'WARNING',
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
        details: 'Flagged: 3 critical support tickets unresolved for over 72 hours. Competitor pricing page visited from corporate domain.',
        impact: 'Potential Loss: $89,000 ARR'
      },
      {
        time: '14:07',
        title: 'AI Churn Analysis Completed',
        agent: 'RiskAnalysisAgent',
        confidence: '92.1%',
        icon: <Activity size={14} />,
        status: 'DIAGNOSED',
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
        details: 'Root cause analysis indicates blocker on accounting module integration. Client requested custom API endpoint twice.',
        impact: 'Churn Driver: Product Friction'
      },
      {
        time: '14:08',
        title: 'Retention Strategy Generated',
        agent: 'StrategyPlanningAgent',
        confidence: '84.0%',
        icon: <Layers size={14} />,
        status: 'STRATEGIZED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Formulated plan: 1. Deploy senior solutions engineer to build custom connector. 2. Flag support tickets for immediate executive priority.',
        impact: 'Engineering Effort: 12 Hours'
      },
      {
        time: '14:10',
        title: 'Simulation Completed',
        agent: 'SimulationAgent',
        confidence: '87.4%',
        icon: <Cpu size={14} />,
        status: 'SIMULATED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Simulated resolution curves: Rapid resolution of accounting bottleneck increases renewal odds to 88%.',
        impact: 'Risk Reduction: -73%'
      },
      {
        time: '14:11',
        title: 'Intervention Approved',
        agent: 'GovernanceEngine',
        confidence: '99.5%',
        icon: <Shield size={14} />,
        status: 'APPROVED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Approved manual CSM outreach. Assigned Solutions Architect to build API helper. System auto-escalated support tier.',
        impact: 'Authorized: Escalation Protocol'
      },
      {
        time: '14:25',
        title: 'Customer Retained',
        agent: 'ActionAgent',
        confidence: '98.5%',
        icon: <Zap size={14} />,
        status: 'SUCCESS',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Solutions engineer delivered working custom connector. Tickets resolved. Client confirmed intention to renew.',
        impact: 'Protected Revenue: $89,000 ARR'
      }
    ]
  },
  {
    id: 'CUST-0441-Omega',
    name: 'Stark Industries',
    industry: 'Defense & AI Systems',
    arr: 340000,
    riskBefore: '98%',
    riskAfter: '5%',
    driver: 'Service Outage & Executive Turnover',
    status: 'COMPLETED',
    color: '#f87171',
    steps: [
      {
        time: '11:30',
        title: 'Customer Risk Detected',
        agent: 'XGBoostClassifier',
        confidence: '99.1%',
        icon: <Shield size={14} />,
        status: 'CRITICAL',
        color: 'text-red-400 border-red-500/30 bg-red-500/5',
        details: 'Severe Anomaly: Stark Industries experienced 45 min core API downtime. New CTO appointed this week.',
        impact: 'Potential Loss: $340,000 ARR'
      },
      {
        time: '11:31',
        title: 'AI Churn Analysis Completed',
        agent: 'RiskAnalysisAgent',
        confidence: '98.2%',
        icon: <Activity size={14} />,
        status: 'DIAGNOSED',
        color: 'text-red-400 border-red-500/30 bg-red-500/5',
        details: 'New CTO previously cancelled contracts with our service at their last company. Health score dropped to 14/100.',
        impact: 'Churn Driver: Relationship & Outage'
      },
      {
        time: '11:33',
        title: 'Retention Strategy Generated',
        agent: 'StrategyPlanningAgent',
        confidence: '93.5%',
        icon: <Layers size={14} />,
        status: 'STRATEGIZED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Formulated strategy: 1. Auto-credit $15,000 SLA penalty. 2. Request Stark-specific Dedicated Success Manager.',
        impact: 'SLA Credit: $15,000'
      },
      {
        time: '11:35',
        title: 'Simulation Completed',
        agent: 'SimulationAgent',
        confidence: '90.5%',
        icon: <Cpu size={14} />,
        status: 'SIMULATED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Monte Carlo models predict CTO engagement chances rise by 82% if outreach includes SLA credits upfront.',
        impact: 'Success odds: 91%'
      },
      {
        time: '11:36',
        title: 'Intervention Approved',
        agent: 'GovernanceEngine',
        confidence: '99.9%',
        icon: <Shield size={14} />,
        status: 'APPROVED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'SLA refund auto-dispatched. Priority scheduling link sent to CTO with a personalized service reliability report.',
        impact: 'Authorized: VIP Override'
      },
      {
        time: '11:55',
        title: 'Customer Retained',
        agent: 'ActionAgent',
        confidence: '95.0%',
        icon: <Zap size={14} />,
        status: 'SUCCESS',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Outreach successful. CTO accepted the SLA credits and scheduled weekly syncs. Renewal secured.',
        impact: 'Protected Revenue: $340,000 ARR'
      }
    ]
  },
  {
    id: 'CUST-3189-Sigma',
    name: 'Tyrell Corp',
    industry: 'Biotech & Genomics',
    arr: 210000,
    riskBefore: '76%',
    riskAfter: '10%',
    driver: 'Seat Underutilization',
    status: 'COMPLETED',
    color: '#a78bfa',
    steps: [
      {
        time: '16:40',
        title: 'Customer Risk Detected',
        agent: 'XGBoostClassifier',
        confidence: '82.3%',
        icon: <Shield size={14} />,
        status: 'WARNING',
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
        details: 'Flagged: Active seats dropped from 85% to 30% over a 30-day window. Renewal due in 60 days.',
        impact: 'Potential Loss: $210,000 ARR'
      },
      {
        time: '16:41',
        title: 'AI Churn Analysis Completed',
        agent: 'RiskAnalysisAgent',
        confidence: '89.0%',
        icon: <Activity size={14} />,
        status: 'DIAGNOSED',
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
        details: 'Low activity localized to regional office. Key departments haven\'t logged in since internal reorganization.',
        impact: 'Churn Driver: Low Adoption'
      },
      {
        time: '16:43',
        title: 'Retention Strategy Generated',
        agent: 'StrategyPlanningAgent',
        confidence: '82.5%',
        icon: <Layers size={14} />,
        status: 'STRATEGIZED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Propose automated training sequence, feature tour tailored to new departments, and free seat alignment.',
        impact: 'Training Credit: 2 Workshops'
      },
      {
        time: '16:44',
        title: 'Simulation Completed',
        agent: 'SimulationAgent',
        confidence: '81.2%',
        icon: <Cpu size={14} />,
        status: 'SIMULATED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Training engagement models estimate seat utilization will climb to 70%+ after workshops, restoring value.',
        impact: 'Adoption uplift: +133%'
      },
      {
        time: '16:45',
        title: 'Intervention Approved',
        agent: 'GovernanceEngine',
        confidence: '99.0%',
        icon: <Shield size={14} />,
        status: 'APPROVED',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Triggered training invitation campaign. Blocked sales outreach to prevent account noise while re-onboarding.',
        impact: 'Approved: Auto-Onboard flow'
      },
      {
        time: '17:10',
        title: 'Customer Retained',
        agent: 'ActionAgent',
        confidence: '92.0%',
        icon: <Zap size={14} />,
        status: 'SUCCESS',
        color: 'text-[#c5f82a] border-[#c5f82a]/30 bg-[#c5f82a]/5',
        details: 'Regional teams successfully re-onboarded. Active seat utilization restored to 78%. Contract renewed.',
        impact: 'Protected Revenue: $210,000 ARR'
      }
    ]
  }
];

const RevenueProtectionTimeline = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(MOCK_CUSTOMERS[0].id);
  const selectedCustomer = MOCK_CUSTOMERS.find(c => c.id === selectedCustomerId);
  
  return (
    <div className="bg-[#070c08]/90 backdrop-blur-xl border border-cyber-border rounded-none p-6 shadow-2xl relative overflow-hidden animate-in fade-in duration-500">
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c5f82a] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c5f82a] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c5f82a] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c5f82a] pointer-events-none"></div>
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1a281e] pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 bg-[#c5f82a] animate-pulse"></span>
            <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase font-bold">REVENUE_ASSURANCE_SYSTEM</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase font-display">Revenue Protection Desk</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mt-1 font-mono">End-to-end B2B retention and protection traces</p>
        </div>
        
        {/* Protection Summary KPI */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="bg-black/40 border border-[#1a281e] p-3 min-w-[140px] relative">
            <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#c5f82a]"></div>
            <div className="absolute top-0 left-0 w-[1px] h-3 bg-[#c5f82a]"></div>
            <span className="text-[8px] text-zinc-500 font-mono font-bold uppercase tracking-wider block mb-1">TOTAL_PROTECTED</span>
            <span className="text-xl font-display text-[#c5f82a] font-bold">$763.5K</span>
          </div>
          <div className="bg-black/40 border border-[#1a281e] p-3 min-w-[140px] relative">
            <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#c5f82a]"></div>
            <div className="absolute top-0 left-0 w-[1px] h-3 bg-[#c5f82a]"></div>
            <span className="text-[8px] text-zinc-500 font-mono font-bold uppercase tracking-wider block mb-1">RETENTION_RATE</span>
            <span className="text-xl font-display text-white font-bold">96.4%</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Customer Selector */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
            / ACCOUNT_SELECTION
          </div>
          <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto custom-scrollbar pr-1">
            {MOCK_CUSTOMERS.map((cust) => {
              const isSelected = cust.id === selectedCustomerId;
              return (
                <button
                  key={cust.id}
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`text-left p-4 rounded-none transition-all duration-300 relative border flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-[#0f1712] border-[#c5f82a] shadow-[0_0_15px_rgba(197,248,42,0.1)]' 
                      : 'bg-black/40 border-[#1a281e] hover:border-zinc-700 hover:bg-[#070c08]/50'
                  }`}
                >
                  {/* Selected Indicator Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c5f82a]"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 font-bold block mb-1">{cust.id}</span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">{cust.name}</h4>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase font-semibold">{cust.industry}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-zinc-500 font-bold block mb-1">ARR</span>
                      <span className="text-xs font-mono font-bold text-white">
                        ${cust.arr.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Footer status line inside button */}
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#1a281e]/60">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-mono text-zinc-600 font-bold">RISK:</span>
                      <span className="text-[10px] font-mono font-bold text-red-400">{cust.riskBefore}</span>
                      <ArrowRight size={10} className="text-zinc-600" />
                      <span className="text-[10px] font-mono font-bold text-[#c5f82a]">{cust.riskAfter}</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-[#c5f82a]/10 text-[#c5f82a] px-1.5 py-0.5 uppercase tracking-tighter">
                      {cust.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Quick Info details */}
          <div className="bg-black/50 border border-[#1a281e] p-4 font-mono text-xs">
            <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest block mb-2">/ ROOT_CHURN_CAUSE</span>
            <div className="text-white font-bold mb-3 uppercase tracking-tight">
              {selectedCustomer?.driver}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 border-t border-[#1a281e]/60 pt-2 font-bold">
              <span>ANALYSIS_VECTOR:</span>
              <span className="text-[#c5f82a]">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Timeline */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
            <span>/ LIFECYCLE_PROTECTION_TRACE ({selectedCustomer?.name})</span>
            <span className="text-[#c5f82a] font-bold">STABLE_TRACE</span>
          </div>

          <div className="bg-black/30 border border-[#1a281e] p-6 relative overflow-hidden flex-1 min-h-[460px] custom-scrollbar">
            {/* Background vertical timeline track */}
            <div className="absolute left-[39px] top-6 bottom-6 w-[2px] bg-[#1a281e]"></div>
            
            <div className="space-y-6 relative">
              <AnimatePresence mode="popLayout">
                {selectedCustomer?.steps.map((step, idx) => {
                  const isSuccess = step.status === 'SUCCESS';
                  const isCritical = step.status === 'CRITICAL';
                  
                  return (
                    <motion.div
                      key={`${selectedCustomer.id}-${idx}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="relative flex gap-8 group"
                    >
                      {/* Timeline Node Icon/Pulse */}
                      <div className="relative z-10 shrink-0">
                        <div className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                          isSuccess ? 'bg-[#c5f82a] text-black border-[#c5f82a] shadow-[0_0_15px_rgba(197,248,42,0.4)]' :
                          isCritical ? 'bg-red-950 text-red-400 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
                          'bg-black border-[#1a281e] text-zinc-400 group-hover:border-[#c5f82a] group-hover:text-white'
                        }`}>
                          {step.icon}
                        </div>
                      </div>

                      {/* Event Detail Card */}
                      <div className="flex-1 bg-black/40 border border-[#1a281e] group-hover:border-[#1a281e] transition-colors p-4 relative flex flex-col justify-between">
                        
                        {/* Detail Header */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2 pb-2 border-b border-[#1a281e]/40">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-zinc-500 font-bold">{step.time}</span>
                            <h5 className="text-xs font-bold text-white uppercase tracking-tight">{step.title}</h5>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                              <span className="text-[7px] text-zinc-600 font-bold font-mono">AGENT_ID</span>
                              <span className="text-[9px] text-[#c5f82a] font-mono font-bold uppercase">{step.agent}</span>
                            </div>
                            <div className="w-[1px] h-4 bg-[#1a281e]"></div>
                            <div className="flex flex-col items-end">
                              <span className="text-[7px] text-zinc-600 font-bold font-mono">CONFIDENCE</span>
                              <span className="text-[9px] text-zinc-300 font-mono font-bold">{step.confidence}</span>
                            </div>
                          </div>
                        </div>

                        {/* Detail Body */}
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-mono mb-3 uppercase tracking-tight">
                          {step.details}
                        </p>

                        {/* Outcome KPI Accent */}
                        <div className="flex justify-between items-center bg-black/80 border border-[#1a281e]/60 px-3 py-1.5">
                          <span className="text-[8px] text-zinc-500 font-mono font-bold uppercase tracking-wider">BUSINESS_IMPACT</span>
                          <span className={`text-[10px] font-mono font-bold ${
                            isSuccess ? 'text-[#c5f82a]' : isCritical ? 'text-red-400' : 'text-white'
                          }`}>
                            {step.impact}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
      
      {/* System Footer info */}
      <div className="border-t border-[#1a281e] pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
        <div className="flex gap-4 mb-2 sm:mb-0">
          <span>PIPELINE_INTEGRITY: SECURE</span>
          <span>•</span>
          <span>ROI_TIGHT: 100% PASS</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-zinc-700">SENTIENT_RETENTION_DESK</span>
          <span className="w-1.5 h-1.5 bg-[#c5f82a]/30 rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default RevenueProtectionTimeline;
