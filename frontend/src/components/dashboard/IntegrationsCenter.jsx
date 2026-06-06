import React from 'react';
import { CheckCircle, AlertCircle, Database, Clock, Server, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

const integrations = [
  { id: 'salesforce', name: 'Salesforce', status: 'connected', health: 99.9, lastSync: '2 mins ago', records: '2.4M', color: '#00A1E0' },
  { id: 'hubspot', name: 'HubSpot', status: 'connected', health: 100, lastSync: 'Just now', records: '850K', color: '#FF7A59' },
  { id: 'stripe', name: 'Stripe', status: 'connected', health: 99.8, lastSync: '5 mins ago', records: '1.2M', color: '#635BFF' },
  { id: 'zendesk', name: 'Zendesk', status: 'connected', health: 98.5, lastSync: '12 mins ago', records: '420K', color: '#03363D' },
  { id: 'intercom', name: 'Intercom', status: 'connected', health: 99.2, lastSync: '1 min ago', records: '680K', color: '#175CFF' },
  { id: 'slack', name: 'Slack', status: 'connected', health: 100, lastSync: 'Real-time', records: 'Events', color: '#4A154B' },
  { id: 'msteams', name: 'Microsoft Teams', status: 'warning', health: 92.4, lastSync: '45 mins ago', records: 'Events', color: '#6264A7' },
  { id: 'google', name: 'Google Workspace', status: 'connected', health: 100, lastSync: '10 mins ago', records: '1.1M', color: '#4285F4' },
];

const IntegrationsCenter = ({ activeWorkspace }) => {
  return (
    <div className="flex flex-col h-full bg-[#070c08]/80 backdrop-blur-xl border border-cyber-border/50 rounded-2xl shadow-2xl relative overflow-hidden">
      <div className="p-8 pb-6 shrink-0 border-b border-cyber-border/30 bg-[#0a120d]/80">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border"
                style={{ color: activeWorkspace?.color, borderColor: `${activeWorkspace?.color}40`, backgroundColor: `${activeWorkspace?.color}10` }}>
                {activeWorkspace?.name}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter font-display">Enterprise Integrations Center</h1>
            <p className="text-xs text-gray-500 tracking-wider uppercase font-bold mt-1">Seamless data synchronization and workflow automation</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20">
              <ShieldCheck size={14} className="text-cyber-primary" />
              <span className="text-[10px] text-cyber-primary font-black uppercase tracking-widest font-display">SOC2 Type II Compliant</span>
            </div>
          </div>
        </div>

        {/* Workflow Chain */}
        <div className="mt-8 bg-[#050806] border border-[#1a281e] rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <div className="relative z-10 flex items-center justify-between">
            <WorkflowStep title="CRM" subtitle="Data Source" active />
            <ArrowRight size={20} className="text-cyber-primary/50" />
            <WorkflowStep title="Customer Data" subtitle="Ingestion" active />
            <ArrowRight size={20} className="text-cyber-primary/50" />
            <WorkflowStep title="SRE Intelligence" subtitle="Analysis" highlight active />
            <ArrowRight size={20} className="text-cyber-primary/50" />
            <WorkflowStep title="Retention Action" subtitle="Execution" active />
            <ArrowRight size={20} className="text-cyber-primary/50" />
            <WorkflowStep title="Revenue Protected" subtitle="Outcome" final active />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.id} {...integration} />
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkflowStep = ({ title, subtitle, highlight, final, active }) => (
  <div className={`flex flex-col items-center p-3 rounded-lg border min-w-[140px] transition-all ${
    highlight ? 'bg-cyber-primary/10 border-cyber-primary/50 shadow-[0_0_20px_rgba(197,248,42,0.2)]' : 
    final ? 'bg-green-500/10 border-green-500/50 text-green-400' :
    'bg-[#0a120d] border-[#233529]'
  }`}>
    <span className={`text-[10px] uppercase font-black tracking-widest font-display mb-1 ${
      highlight ? 'text-cyber-primary' : 
      final ? 'text-green-400' :
      'text-gray-400'
    }`}>{subtitle}</span>
    <span className={`text-sm font-bold ${
      highlight ? 'text-white' :
      final ? 'text-white' :
      'text-gray-200'
    }`}>{title}</span>
    {active && (
      <div className="mt-2 w-full h-1 bg-[#1a281e] rounded-full overflow-hidden">
        <div className={`h-full ${highlight ? 'bg-cyber-primary' : final ? 'bg-green-400' : 'bg-gray-500'} w-full animate-pulse`} />
      </div>
    )}
  </div>
);

const IntegrationCard = ({ name, status, health, lastSync, records, color }) => (
  <div className="bg-[#0a120d]/80 border border-[#1a281e] rounded-xl p-5 hover:border-cyber-primary/30 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none" style={{ backgroundColor: color }}></div>
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-black text-lg border shadow-sm" style={{ backgroundColor: `${color}15`, borderColor: `${color}30`, color: color }}>
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">{name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            {status === 'connected' ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] text-green-500 uppercase tracking-widest font-bold font-display">Connected</span>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-[9px] text-orange-500 uppercase tracking-widest font-bold font-display">Degraded</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-4 relative z-10">
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-display">Sync Health</span>
          <span className={`text-[10px] font-mono font-bold ${health >= 99 ? 'text-green-400' : 'text-orange-400'}`}>{health}%</span>
        </div>
        <div className="h-1.5 bg-[#121c16] rounded-full overflow-hidden">
          <div className={`h-full ${health >= 99 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${health}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1a281e]">
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 mb-1">
            <Clock size={10} />
            <span className="text-[9px] uppercase tracking-widest font-bold font-display">Last Sync</span>
          </div>
          <span className="text-xs text-gray-300 font-mono">{lastSync}</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 mb-1">
            <Database size={10} />
            <span className="text-[9px] uppercase tracking-widest font-bold font-display">Processed</span>
          </div>
          <span className="text-xs text-gray-300 font-mono">{records}</span>
        </div>
      </div>
    </div>
  </div>
);

export default IntegrationsCenter;
