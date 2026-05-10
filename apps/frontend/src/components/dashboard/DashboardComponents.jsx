import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Shield, Activity, Layers, Link2, CheckCircle, AlertCircle, AlertTriangle, Info, Clock, ChevronDown, Zap, ShieldCheck, User } from 'lucide-react';

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/5 rounded-lg ${className}`}></div>
);

export const BrandLogo = ({ className = "", isSidebar = false }) => (
  <div className={`flex items-center ${isSidebar ? 'gap-3' : 'gap-4'} group cursor-default ${className}`}>
    <div className="relative shrink-0">
      <div className={`${isSidebar ? 'w-10 h-10 rounded-xl' : 'w-14 h-14 rounded-2xl'} bg-cyber-primary flex items-center justify-center shadow-[0_0_40px_rgba(197,248,42,0.3)] group-hover:shadow-[0_0_60px_rgba(197,248,42,0.5)] transition-all duration-700 overflow-hidden relative border border-white/20`}>
        <Shield size={isSidebar ? 20 : 28} className="text-[#0a110b] relative z-20 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-50"></div>
      </div>
      {isSidebar && (
        <div className="absolute -inset-1 bg-cyber-primary/20 rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      )}
    </div>
    <div className="flex flex-col min-w-0">
      <div className={`flex items-center ${isSidebar ? 'gap-1' : 'gap-3'} leading-none mb-0.5`}>
        <span className={`${isSidebar ? 'text-[7px]' : 'text-[12px]'} font-bold text-cyber-primary uppercase tracking-[0.4em] font-mono opacity-100 drop-shadow-[0_0_8px_rgba(197,248,42,0.4)] truncate`}>Sentient</span>
        {!isSidebar && <div className="h-[1px] w-12 bg-gradient-to-r from-cyber-primary/60 to-transparent" />}
      </div>
      <div className="flex items-baseline gap-2 leading-none">
        <span className={`${isSidebar ? 'text-lg' : 'text-4xl'} font-display text-white tracking-widest uppercase group-hover:text-cyber-primary transition-all duration-500 drop-shadow-sm truncate`}>Retention</span>
        {!isSidebar && (
          <div className="flex flex-col border-l-2 border-cyber-primary/20 pl-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase opacity-80 tracking-[0.4em] leading-none mb-1 font-bold">Engine</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-cyber-secondary rounded-full animate-pulse"></div>
              <span className="text-[9px] font-mono text-cyber-secondary uppercase opacity-90 tracking-[0.1em] leading-none font-black">CORE_v4.2.0</span>
            </div>
          </div>
        )}
      </div>
      {isSidebar && (
        <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold mt-0.5 opacity-60">Engine_v5.0</span>
      )}
    </div>
  </div>
);

export const HeroBranding = ({ className = "" }) => (
  <div className={`flex flex-col items-center text-center space-y-10 ${className}`}>
    <div className="relative mb-8">
      {/* Main Shield Icon with Intense Glow */}
      <div className="w-32 h-32 bg-gradient-to-br from-cyber-primary via-[#aed425] to-[#8fb21e] rounded-[2.5rem] flex items-center justify-center shadow-[0_0_100px_rgba(197,248,42,0.3)] relative group overflow-hidden border-2 border-white/20">
        <Shield size={64} className="text-[#0a110b] relative z-20 group-hover:scale-110 transition-transform duration-700 drop-shadow-lg" />
        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Inner HUD ring */}
        <div className="absolute inset-2 border border-black/10 rounded-[2rem] pointer-events-none opacity-50"></div>
      </div>
      
      {/* Decorative Rotating Orbits */}
      <div className="absolute inset-0 -m-8 border-2 border-cyber-primary/20 rounded-full animate-spin-slow opacity-40"></div>
      <div className="absolute inset-0 -m-14 border border-cyber-secondary/15 rounded-full animate-spin-slow opacity-30" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
      <div className="absolute inset-0 -m-20 border border-white/5 rounded-full animate-spin-slow opacity-10" style={{ animationDuration: '35s' }}></div>
      
      {/* HUD Corner Brackets */}
      <div className="absolute -top-12 -left-12 w-12 h-12 border-t-2 border-l-2 border-cyber-primary/60 rounded-tl-xl"></div>
      <div className="absolute -bottom-12 -right-12 w-12 h-12 border-b-2 border-r-2 border-cyber-primary/60 rounded-br-xl"></div>
      
      {/* Floating Status Nodes */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col items-start space-y-3">
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/10 shadow-2xl animate-in slide-in-from-right duration-500">
          <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse shadow-[0_0_12px_#c5f82a]"></div>
          <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase font-bold">SYSTEM_LINK_STABLE</span>
        </div>
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/10 shadow-2xl animate-in slide-in-from-right delay-150 duration-500">
          <div className="w-2 h-2 bg-cyber-secondary rounded-full shadow-[0_0_12px_#00E0FF]"></div>
          <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase font-bold">NEURAL_SYNC_99%</span>
        </div>
      </div>

      <div className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end space-y-3">
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Auth_Mode: AES_512</div>
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Region: Global_Core</div>
      </div>
    </div>

    <div className="space-y-6 relative w-full">
      <div className="flex items-center justify-center gap-8 px-4">
        <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-cyber-primary/60 to-transparent" />
        <span className="text-[11px] font-mono text-cyber-primary uppercase tracking-[1em] font-black drop-shadow-[0_0_10px_rgba(197,248,42,0.5)]">PROD_ENV_RESTRICTED</span>
        <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-cyber-primary/60 to-transparent" />
      </div>
      
      <div className="relative inline-block px-12">
        {/* Subtle Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
          <span className="text-[12rem] font-display text-white tracking-tighter whitespace-nowrap">SRE-SYS</span>
        </div>

        <h1 className="flex flex-col items-center leading-[0.82] py-4 relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-6xl md:text-8xl font-display text-white tracking-tight opacity-100 relative drop-shadow-2xl">
              Sentient
              <span className="absolute -top-6 -right-12 text-[12px] font-mono text-cyber-secondary tracking-[0.5em] font-black bg-cyber-secondary/10 px-2 py-1 rounded border border-cyber-secondary/20">V4.2</span>
            </span>
          </div>
          
          <span className="text-8xl md:text-[11rem] font-display text-cyber-primary tracking-tighter drop-shadow-[0_0_50px_rgba(197,248,42,0.5)] relative group cursor-default">
            Retention
            <div className="absolute -bottom-4 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyber-primary/80 to-transparent" />
            {/* Hover Glitch Effect Decoration */}
            <div className="absolute -inset-2 border border-cyber-primary/0 group-hover:border-cyber-primary/20 transition-all duration-500 rounded-2xl pointer-events-none"></div>
          </span>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="h-[2px] w-12 bg-zinc-800" />
            <span className="text-5xl md:text-7xl font-display text-zinc-500 tracking-[0.4em] opacity-40 hover:opacity-80 transition-opacity duration-700">Engine</span>
            <div className="h-[2px] w-12 bg-zinc-800" />
          </div>
        </h1>
        
        {/* Side-loading Vertical Tags */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-center hidden xl:block">
          <span className="text-[10px] font-mono text-white/30 tracking-[1em] uppercase font-bold whitespace-nowrap border-r border-white/10 pr-4 mr-4">Architecture_Omni</span>
          <span className="text-[10px] font-mono text-cyber-primary/40 tracking-[1em] uppercase font-bold whitespace-nowrap">Status_Online</span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 pt-4">
        <div className="relative">
          <p className="max-w-2xl text-zinc-400 font-sans text-base md:text-xl leading-relaxed tracking-wide font-medium italic opacity-90 px-8">
            "Architecting the future of customer relationships through <span className="text-white not-italic font-black border-b-2 border-cyber-primary/60 pb-1 px-1 bg-white/5 rounded-sm shadow-xl">True-Autonomous</span> intelligence."
          </p>
          <div className="absolute -left-2 top-0 text-4xl text-cyber-primary/20 font-serif">"</div>
          <div className="absolute -right-2 bottom-0 text-4xl text-cyber-primary/20 font-serif">"</div>
        </div>
        
        <div className="grid grid-cols-3 gap-12 w-full max-w-2xl border-y border-white/5 py-10 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
          <div className="flex flex-col items-center space-y-3 group cursor-help border-r border-white/5">
            <div className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.3em] group-hover:text-cyber-primary transition-colors font-bold">Security_Tier</div>
            <div className="text-sm font-black text-white/90 font-mono tracking-tighter bg-black/40 px-3 py-1 rounded border border-white/5">AES_L-9_ULTRA</div>
          </div>
          <div className="flex flex-col items-center space-y-3 group cursor-help border-r border-white/5">
            <div className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.3em] group-hover:text-cyber-secondary transition-colors font-bold">Neural_Load</div>
            <div className="text-sm font-black text-white/90 font-mono tracking-tighter bg-black/40 px-3 py-1 rounded border border-white/5">OPTIMAL_0.02ms</div>
          </div>
          <div className="flex flex-col items-center space-y-3 group cursor-help">
            <div className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.3em] group-hover:text-cyber-alert transition-colors font-bold">System_Auth</div>
            <div className="text-sm font-black text-white/90 font-mono tracking-tighter bg-black/40 px-3 py-1 rounded border border-white/5">VERIFIED_ROOT</div>
          </div>
        </div>

        {/* System Footer Bar */}
        <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-600 uppercase tracking-[0.5em] opacity-50">
          <span>Boot_Sequence: Complete</span>
          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
          <span>Kernel: v5.0.4-SRE</span>
          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
          <span>Nodes: 1,024_ACTIVE</span>
        </div>
      </div>
    </div>
  </div>
);


export const AestheticBrandShowcase = ({ className = "" }) => (
  <div className={`relative w-full py-20 overflow-hidden flex flex-col items-center justify-center bg-[#050805] ${className}`}>
    {/* Background Grid & Scanlines */}
    <div className="absolute inset-0 hud-grid opacity-20"></div>
    <div className="absolute inset-0 hud-scanline opacity-10"></div>
    
    {/* Large Background Watermark */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
      <span className="text-[25rem] font-display text-white tracking-tighter leading-none">SENTIENT</span>
    </div>

    {/* HUD Elements */}
    <div className="absolute top-10 left-10 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-cyber-primary rounded-full animate-pulse"></div>
        <span className="text-[10px] font-mono text-cyber-primary tracking-widest uppercase">Kernel_v5.0.4</span>
      </div>
      <div className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">Auth_Validation: Active</div>
    </div>

    <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-right">
      <span className="text-[10px] font-mono text-cyber-secondary tracking-widest uppercase">Region: Global_Core_Cluster</span>
      <div className="flex items-center gap-2">
        <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">Uptime: 99.9998%</span>
        <div className="w-1.5 h-1.5 bg-cyber-secondary rounded-full"></div>
      </div>
    </div>

    {/* Main Typographic Core */}
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="mb-4">
        <div className="flex items-center gap-4 group">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-cyber-primary/40 group-hover:w-32 transition-all duration-700"></div>
          <span className="text-[12px] font-mono text-cyber-primary tracking-[0.8em] font-black uppercase drop-shadow-[0_0_8px_rgba(197,248,42,0.5)]">Autonomous_System</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-cyber-primary/40 group-hover:w-32 transition-all duration-700"></div>
        </div>
      </div>

      <h1 className="flex flex-col items-center leading-[0.8]">
        <div className="relative group cursor-default">
          <span className="text-8xl md:text-[10rem] font-display text-white tracking-tight relative z-10 group-hover:text-cyber-primary transition-colors duration-1000">
            SENTIENT
          </span>
          {/* Glitch Overlay (Hidden) */}
          <span className="absolute inset-0 text-cyber-alert opacity-0 group-hover:opacity-20 translate-x-1 translate-y-1 font-display text-8xl md:text-[10rem] tracking-tight transition-opacity duration-300">SENTIENT</span>
        </div>
        
        <div className="relative mt-2">
          <span className="text-[10rem] md:text-[14rem] font-display text-cyber-primary tracking-tighter drop-shadow-[0_0_60px_rgba(197,248,42,0.4)] block">
            RETENTION
          </span>
          {/* Decorative Underline HUD */}
          <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-between px-4">
            <div className="w-4 h-4 border-b-2 border-l-2 border-cyber-primary"></div>
            <div className="flex-1 h-[2px] mx-4 bg-gradient-to-r from-transparent via-cyber-primary/60 to-transparent"></div>
            <div className="w-4 h-4 border-b-2 border-r-2 border-cyber-primary"></div>
          </div>
        </div>

        <div className="flex items-center gap-10 mt-12">
          <div className="flex flex-col items-end border-r border-white/10 pr-10">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] font-bold">Protocol</span>
            <span className="text-xl font-display text-white tracking-widest uppercase">X-ALPHA-9</span>
          </div>
          <span className="text-6xl md:text-8xl font-display text-zinc-700 tracking-[0.3em] opacity-30 hover:opacity-100 transition-all duration-1000 cursor-default">
            ENGINE
          </span>
          <div className="flex flex-col items-start border-l border-white/10 pl-10">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] font-bold">Class</span>
            <span className="text-xl font-display text-white tracking-widest uppercase">SENTIENT_V4</span>
          </div>
        </div>
      </h1>

      {/* Decorative Brackets & Metadata */}
      <div className="mt-20 grid grid-cols-2 gap-20 w-full max-w-4xl px-10">
        <div className="p-6 border-l-2 border-cyber-primary/40 bg-white/[0.02] backdrop-blur-md rounded-r-2xl group hover:border-cyber-primary transition-all">
          <div className="text-[10px] font-mono text-cyber-primary/60 uppercase tracking-widest mb-4">Neural_Architecture</div>
          <p className="text-zinc-400 font-sans text-sm leading-relaxed italic">
            "Leveraging deep-temporal modeling to predict and mitigate churn vectors in real-time environment clusters."
          </p>
        </div>
        <div className="p-6 border-r-2 border-cyber-secondary/40 bg-white/[0.02] backdrop-blur-md rounded-l-2xl text-right group hover:border-cyber-secondary transition-all">
          <div className="text-[10px] font-mono text-cyber-secondary/60 uppercase tracking-widest mb-4">Security_Standard</div>
          <p className="text-zinc-400 font-sans text-sm leading-relaxed italic">
            "Validated under L-04 high-authority clearance with full AES-512 end-to-end data encryption protocols."
          </p>
        </div>
      </div>
    </div>

    {/* Floating HUD Brackets (Top & Bottom) */}
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  </div>
);

export const HUDMetadata = ({ label, value, color = "text-cyber-primary" }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-bold">{label}</span>
    <span className={`text-sm font-mono font-black ${color} tracking-tighter uppercase`}>{value}</span>
  </div>
);

export const DetailedCompanyBranding = ({ className = "" }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`relative flex flex-col items-center justify-center py-24 px-12 bg-black/40 backdrop-blur-md rounded-[3rem] border border-white/5 overflow-hidden group/master ${className}`}
  >
    {/* Dynamic Background HUD Elements */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-primary/5 via-transparent to-transparent opacity-50"></div>
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent"></div>
    
    <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between w-full mb-16 border-b border-white/5 pb-8">
        <div className="flex items-center gap-10">
          <HUDMetadata label="Access_Node" value="MN-01-CORE" />
          <HUDMetadata label="Protocol" value="AES_X9" color="text-cyber-secondary" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse shadow-[0_0_10px_#c5f82a]"></div>
          <span className="text-[11px] font-mono text-white tracking-[0.4em] uppercase font-black">System_Online_v5.0.4</span>
        </div>
        <div className="flex items-center gap-10">
          <HUDMetadata label="Uptime" value="99.999%" color="text-cyber-secondary" />
          <HUDMetadata label="Latency" value="0.002ms" />
        </div>
      </div>

      {/* Main Typographic Construction */}
      <div className="flex flex-col items-center w-full space-y-4">
        {/* SENTIENT - The Foundation */}
        <div className="relative group cursor-default w-full flex justify-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
            <span className="text-[20rem] font-display text-white tracking-tighter -translate-y-4">S</span>
          </div>
          <h2 className="text-7xl md:text-[11rem] font-display text-white tracking-[0.15em] relative z-10 hover:text-cyber-primary transition-all duration-700 ease-out">
            SENTIENT
          </h2>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
             <div className="h-6 w-px bg-cyber-primary/40"></div>
             <span className="text-[9px] font-mono text-cyber-primary tracking-[0.6em] font-black uppercase bg-cyber-primary/10 px-3 py-1 rounded-sm border border-cyber-primary/20">Autonomous_Intelligence</span>
          </div>
        </div>

        {/* RETENTION - The Core Utility */}
        <div className="relative group w-full py-4 flex justify-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[40%] bg-cyber-primary/5 skew-y-[-1deg] -z-10 group-hover:h-[60%] transition-all duration-700"></div>
          <h2 className="text-8xl md:text-[15rem] font-display text-cyber-primary tracking-tighter drop-shadow-[0_0_70px_rgba(197,248,42,0.6)] leading-none">
            RETENTION
          </h2>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-cyber-primary/20 animate-scan pointer-events-none shadow-[0_0_15px_#c5f82a]"></div>
        </div>

        {/* ENGINE - The Power Plant */}
        <div className="flex items-center gap-16 group w-full justify-center">
          <div className="flex flex-col items-end opacity-20 group-hover:opacity-100 transition-all duration-700 transform group-hover:-translate-x-4">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-black">Component</span>
            <span className="text-3xl font-display text-white tracking-widest uppercase">X_DECISION</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-display text-zinc-700 tracking-[0.45em] opacity-30 group-hover:opacity-100 group-hover:text-white transition-all duration-1000 group-hover:tracking-[0.55em]">
            ENGINE
          </h2>
          <div className="flex flex-col items-start opacity-20 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-x-4">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-black">Status</span>
            <span className="text-3xl font-display text-cyber-primary tracking-widest uppercase">ACTIVE_FLIGHT</span>
          </div>
        </div>
      </div>

      {/* Semantic Breakdown Details */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-16 w-full border-t border-white/5 pt-16">
        <div className="space-y-6 group/item">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20 flex items-center justify-center group-hover/item:bg-cyber-primary group-hover/item:text-black transition-all">
              <Shield size={20} />
            </div>
            <span className="text-lg font-display text-white tracking-widest uppercase">Guardian_Shield</span>
          </div>
          <p className="text-sm font-sans text-zinc-500 leading-relaxed italic group-hover/item:text-zinc-300 transition-colors">
            "Advanced cryptographic boundaries ensuring 100% data integrity across all neural retention nodes."
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['RSA_4096', 'ECC_P384', 'ZERO_TRUST'].map(tag => (
              <span key={tag} className="text-[9px] font-mono font-bold text-zinc-600 border border-white/5 px-2 py-1 rounded bg-white/2">{tag}</span>
            ))}
          </div>
        </div>

        <div className="space-y-6 group/item">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyber-secondary/10 border border-cyber-secondary/20 flex items-center justify-center group-hover/item:bg-cyber-secondary group-hover/item:text-black transition-all">
              <Cpu size={20} />
            </div>
            <span className="text-lg font-display text-white tracking-widest uppercase">Neural_Fabric</span>
          </div>
          <p className="text-sm font-sans text-zinc-500 leading-relaxed italic group-hover/item:text-zinc-300 transition-colors">
            "Proprietary deep-learning architecture optimized for sub-millisecond churn vector prediction."
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['TENSOR_X', 'CUDA_SRE', 'NEURAL_LINK'].map(tag => (
              <span key={tag} className="text-[9px] font-mono font-bold text-cyber-secondary/60 border border-cyber-secondary/10 px-2 py-1 rounded bg-cyber-secondary/5">{tag}</span>
            ))}
          </div>
        </div>

        <div className="space-y-6 group/item">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyber-alert/10 border border-cyber-alert/20 flex items-center justify-center group-hover/item:bg-cyber-alert group-hover/item:text-white transition-all">
              <Zap size={20} />
            </div>
            <span className="text-lg font-display text-white tracking-widest uppercase">Infinite_Scale</span>
          </div>
          <p className="text-sm font-sans text-zinc-500 leading-relaxed italic group-hover/item:text-zinc-300 transition-colors">
            "Massively parallelized execution environment designed for global-scale customer ecosystems."
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['K8S_CORE', 'SERVERLESS', 'OMNI_DIST'].map(tag => (
              <span key={tag} className="text-[9px] font-mono font-bold text-cyber-alert/60 border border-cyber-alert/10 px-2 py-1 rounded bg-cyber-alert/5">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Ornamental Data Streams */}
    <div className="absolute right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block"></div>
    <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block"></div>
    
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-20 pointer-events-none group-hover/master:opacity-40 transition-opacity duration-1000">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="text-[7px] font-mono text-white tracking-tighter leading-none">
          {Math.random().toString(16).slice(2, 12).toUpperCase()}
        </div>
      ))}
    </div>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-20 pointer-events-none group-hover/master:opacity-40 transition-opacity duration-1000 text-right">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="text-[7px] font-mono text-white tracking-tighter leading-none">
          {Math.random().toString(16).slice(2, 12).toUpperCase()}
        </div>
      ))}
    </div>
  </motion.div>
);

export const CompactAestheticBranding = ({ className = "" }) => (
  <div className={`flex flex-col items-center group cursor-default ${className}`}>
    <div className="relative mb-3">
      <div className="w-10 h-10 bg-cyber-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(197,248,42,0.1)] group-hover:shadow-[0_0_30px_rgba(197,248,42,0.3)] transition-all duration-500 border border-white/10 overflow-hidden">
        <Shield size={20} className="text-[#0a110b] group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </div>
      <div className="absolute -inset-1 bg-cyber-primary/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    
    <div className="flex flex-col items-center space-y-0 text-center">
      <span className="text-[5px] font-mono text-cyber-primary font-black tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">SENTIENT</span>
      <span className="text-xl font-display text-white tracking-widest uppercase group-hover:text-cyber-primary transition-all duration-300">SRE</span>
      <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent my-1" />
      <span className="text-[5px] font-mono text-zinc-600 font-bold tracking-[0.1em] uppercase group-hover:text-cyber-secondary transition-colors whitespace-nowrap">RETENTION_ENGINE</span>
    </div>
  </div>
);

export const AestheticBrandArchitecture = ({ className = "" }) => (
  <div className={`relative w-full max-w-7xl mx-auto py-32 px-10 overflow-hidden ${className}`}>
    {/* Background Decorative HUD */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(197,248,42,0.03)_0%,transparent_70%)]"></div>
      <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
    </div>

    <div className="relative z-10 flex flex-col items-center">
      {/* Title Block with Technical Breakdown */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-10 mb-24">
        
        {/* Left Specification Column */}
        <div className="hidden lg:flex flex-col gap-12 items-end text-right">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <span className="text-[10px] font-mono text-cyber-primary tracking-[0.4em] uppercase font-black block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Module_Identifier</span>
            <h3 className="text-2xl font-display text-white tracking-widest uppercase">SNT-PRIME</h3>
            <p className="text-xs font-sans text-zinc-500 mt-2 max-w-[200px] leading-relaxed">High-level cognitive orchestration layer for neural decisioning.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="group"
          >
            <span className="text-[10px] font-mono text-cyber-secondary tracking-[0.4em] uppercase font-black block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Operational_Vector</span>
            <h3 className="text-2xl font-display text-white tracking-widest uppercase">RET-MATRIX</h3>
            <p className="text-xs font-sans text-zinc-500 mt-2 max-w-[200px] leading-relaxed">Multi-dimensional churn mitigation framework with real-time feedback.</p>
          </motion.div>
        </div>

        {/* Center Typographic Masterpiece */}
        <div className="flex flex-col items-center space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative flex flex-col items-center"
          >
            <span className="absolute -top-12 text-[10rem] font-display text-white/[0.03] select-none pointer-events-none tracking-tighter">SRE</span>
            
            <div className="flex flex-col items-center">
              <span className="text-8xl md:text-[12rem] font-display text-white leading-none tracking-tight group cursor-default">
                SENTIENT
                <div className="h-1.5 w-0 group-hover:w-full bg-cyber-primary transition-all duration-700 shadow-[0_0_15px_#c5f82a]"></div>
              </span>
              <div className="flex items-center gap-4 w-full mt-2">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-[11px] font-mono text-cyber-primary tracking-[0.8em] font-bold uppercase">Retention Engine</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-6 mt-10">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
              <div className="w-1.5 h-1.5 bg-cyber-primary rounded-full animate-pulse"></div>
              <span className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase">v5.0_STABLE</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
              <div className="w-1.5 h-1.5 bg-cyber-secondary rounded-full"></div>
              <span className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase">AES_ENCRYPTED</span>
            </div>
          </div>
        </div>

        {/* Right Specification Column */}
        <div className="hidden lg:flex flex-col gap-12 items-start text-left">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <span className="text-[10px] font-mono text-cyber-primary tracking-[0.4em] uppercase font-black block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Neural_Load</span>
            <h3 className="text-2xl font-display text-white tracking-widest uppercase">98.4_TPS</h3>
            <p className="text-xs font-sans text-zinc-500 mt-2 max-w-[200px] leading-relaxed">Processing 98.4 transactions per second across neural fabric nodes.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="group"
          >
            <span className="text-[10px] font-mono text-cyber-secondary tracking-[0.4em] uppercase font-black block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Security_Tier</span>
            <h3 className="text-2xl font-display text-white tracking-widest uppercase">LEVEL_04</h3>
            <p className="text-xs font-sans text-zinc-500 mt-2 max-w-[200px] leading-relaxed">High-authority clearance required for access to sentient core modules.</p>
          </motion.div>
        </div>
      </div>

      {/* Semantic Word Detail - The "Detail" part of the request */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            word: "SENTIENT",
            detail: "Describes the autonomous capability of the engine to interpret complex human behavioral patterns using neural-temporal modeling.",
            tags: ["Autonomous", "Neural", "Context-Aware"]
          },
          {
            word: "RETENTION",
            detail: "The operational output focused on converting churn indicators into long-term loyalty vectors through predictive stabilization.",
            tags: ["Stability", "Conversion", "Growth"]
          },
          {
            word: "ENGINE",
            detail: "The high-throughput computational core that orchestrates real-time agentic responses across distributed system clusters.",
            tags: ["Distributed", "Real-time", "Core"]
          }
        ].map((item, idx) => (
          <motion.div
            key={item.word}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="relative p-8 bg-white/[0.01] border border-white/5 rounded-2xl group hover:bg-white/[0.03] transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-8 h-px bg-cyber-primary group-hover:w-full transition-all duration-700"></div>
            <div className="text-[10px] font-mono text-zinc-700 mb-4 tracking-[0.5em] font-bold uppercase">Definition_{idx + 1}</div>
            <h4 className="text-3xl font-display text-white tracking-widest mb-4 group-hover:text-cyber-primary transition-colors">{item.word}</h4>
            <p className="text-xs font-sans text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors italic">"{item.detail}"</p>
            <div className="flex gap-2 mt-6">
              {item.tags.map(tag => (
                <span key={tag} className="text-[8px] font-mono text-zinc-600 px-2 py-1 border border-white/5 rounded bg-black/20">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const KPICard = ({ title, value, badge, badgeColor = "text-cyber-primary bg-cyber-primary/10 border-cyber-primary/30", sparklineData }) => (
  <div className="premium-card p-6 flex flex-col relative overflow-hidden group">
    <div className="accent-line"></div>
    <div className="flex justify-between items-start mb-6 z-10">
      <div className="text-label text-zinc-400 font-medium">{title}</div>
      {badge && (
        <div className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold tracking-widest ${badgeColor}`}>
          {badge}
        </div>
      )}
    </div>
    <div className="text-5xl text-value text-white z-10 mb-4 font-display leading-none">{value}</div>
    {/* Sparkline */}
    <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-60">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c5f82a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c5f82a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={sparklineData.path} fill={`url(#grad-${title.replace(/\s/g, '')})`} />
        <path d={sparklineData.line} fill="none" stroke="#c5f82a" strokeWidth="1" className="opacity-80" />
      </svg>
    </div>
  </div>
);

export const DonutChart = () => (
  <div className="premium-card p-6 flex flex-col h-full relative">
    <div className="text-label mb-6">Driver Distribution</div>
    <div className="flex-1 flex flex-col items-center justify-center relative">
      <svg viewBox="0 0 100 100" className="w-36 h-36">
        <circle cx="50" cy="50" r="35" fill="none" stroke="#1A1A1A" strokeWidth="12" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#c5f82a" strokeWidth="12" strokeDasharray="160 251" strokeDashoffset="-20" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span className="text-white text-value text-3xl font-display">{48.2}K</span>
        <span className="text-zinc-500 text-[11px] font-semibold uppercase tracking-[0.2em] mt-1">records</span>
      </div>
      <div className="flex gap-4 mt-8 text-[11px] font-semibold uppercase tracking-wider">
        <div className="flex items-center gap-1.5 text-zinc-400"><div className="w-1.5 h-1.5 rounded-full bg-cyber-primary"></div> Price</div>
        <div className="flex items-center gap-1.5 text-zinc-500"><div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div> Qual</div>
        <div className="flex items-center gap-1.5 text-zinc-500"><div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div> Cont</div>
      </div>
    </div>
  </div>
);

export const BarChart = () => (
  <div className="premium-card p-6 flex flex-col h-full">
    <div className="text-label mb-6">Risk Interventions — 7 Days</div>
    <div className="flex-1 flex flex-col justify-end">
      <div className="flex items-end justify-center gap-4 h-32 mb-6">
        {[
          [60, 40], [80, 50], [40, 30], [90, 60], [100, 30]
        ].map((pair, i) => (
          <div key={i} className="flex items-end gap-1 h-full">
            <div className="w-4 bg-cyber-primary" style={{height: `${pair[0]}%`}}></div>
            <div className="w-4 bg-zinc-800" style={{height: `${pair[1]}%`}}></div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 text-[11px] font-semibold uppercase tracking-wider">
        <div className="flex items-center gap-1.5 text-zinc-400"><div className="w-1.5 h-1.5 rounded-full bg-cyber-primary"></div> High Risk</div>
        <div className="flex items-center gap-1.5 text-zinc-500"><div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div> Low Risk</div>
      </div>
    </div>
  </div>
);

export const Heatmap = () => {
  const colors = ['#0D0D0D', '#1A1A1A', '#2A2A2A', '#3A3A3A', '#c5f82a'];
  return (
    <div className="premium-card p-6 flex flex-col h-full">
      <div className="text-label mb-6">Churn Score Heatmap</div>
      <div className="flex-1 grid grid-cols-6 gap-1.5 content-center">
        {Array.from({length: 24}).map((_, i) => {
          const colorIndex = i === 13 || i === 22 || i === 5 ? 4 : i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1;
          const color = colors[colorIndex];
          return (
            <div key={i} className="aspect-square rounded-md transition-transform hover:scale-110" 
                 style={{backgroundColor: color}}></div>
          );
        })}
      </div>
    </div>
  );
};

export const ModelCard = ({ name, latency, accuracy, accLabel = "Accuracy" }) => (
  <div className="premium-card p-6 flex flex-col justify-between group">
    <div className="flex justify-between items-center mb-6">
      <div className="text-value text-xl text-white font-display uppercase tracking-wider">{name}</div>
      <div className="text-label">Latency</div>
    </div>
    <div className="text-4xl text-value text-cyber-primary mb-10 font-display">
      {latency}
    </div>
    <div>
      <div className="flex justify-between text-[11px] text-zinc-500 mb-3 font-semibold uppercase tracking-widest font-mono">
        <span>{accLabel}</span>
        <span className="text-cyber-primary">{accuracy}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-cyber-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(197,248,42,0.4)]" style={{width: accuracy}}></div>
      </div>
    </div>
  </div>
);

export const FeatureImportance = () => {
  const features = [
    { name: 'Login_Fr...', val: '95%' },
    { name: 'Cart_Aband', val: '80%' },
    { name: 'Session_L...', val: '65%' },
    { name: 'Err_Rate', val: '40%' },
    { name: 'Days_Since', val: '25%' },
  ];
  return (
    <div className="premium-card p-6 shadow-2xl relative">
      <div className="flex justify-between items-center mb-8">
        <div className="text-value text-xl text-white font-display uppercase tracking-wider">XGBoost Importance</div>
        <div className="text-label text-cyber-primary/80">SHAP VECTOR</div>
      </div>
      <div className="space-y-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-24 text-[11px] text-zinc-400 font-semibold uppercase tracking-wide text-right truncate font-display">{f.name}</div>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden relative flex items-center">
              <div className="h-full bg-cyber-primary rounded-full transition-all duration-1000" style={{width: f.val}}></div>
            </div>
            <div className="w-8 text-[11px] text-zinc-500 font-mono text-right">{f.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const EscalationCard = ({ id, time, badgeText, badgeColor, reason, offers, features, onViewDetails, onTakeOwnership }) => (
  <div className="premium-card p-6 mb-4 group hover:scale-[1.01]">
    <div className="accent-line !bg-cyber-alert/60"></div>
    <div className="flex justify-between items-start mb-4">
      <div className="text-value text-2xl text-white font-display uppercase tracking-wider">{id}</div>
      <div className="text-zinc-500 text-[11px] font-semibold uppercase tracking-widest font-mono">{time}</div>
    </div>
    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border font-display ${badgeColor}`}>
      {badgeText}
    </div>
    <div className="mb-6">
      <div className="text-label mb-2">Failure Reason</div>
      <div className="text-zinc-400 text-sm leading-relaxed font-sans">{reason}</div>
    </div>
    <div className="mb-8">
      <div className="text-label mb-3">Intervention Status</div>
      <div className="space-y-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-20 text-[11px] text-zinc-500 font-semibold uppercase tracking-wide truncate font-display">{f.name}</div>
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-primary rounded-full transition-all duration-700" style={{width: f.val}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex gap-4 mt-2">
      <button 
        onClick={() => onViewDetails && onViewDetails(id)}
        className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-300 font-display text-[14px] uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all"
      >
        Analyze Details
      </button>
      <button 
        onClick={() => onTakeOwnership && onTakeOwnership(id)}
        className="flex-1 py-3 rounded-xl bg-cyber-primary text-cyber-black font-display text-[14px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(197,248,42,0.2)]"
      >
        Claim Case
      </button>
    </div>
  </div>
);

export const EscalationDetailsModal = ({ escalation, onClose, triggerAction, onClaim }) => {
  if (!escalation) return null;
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-hidden relative animate-in zoom-in-95 duration-300 flex flex-col rounded-2xl">
        <div className="accent-line !h-2 !w-full !bg-gradient-to-r from-cyber-primary via-cyber-alert to-cyber-primary"></div>
        
        <div className="p-8 border-b border-white/5 flex justify-between items-start bg-white/2">
           <div>
            <div className="text-label text-cyber-primary/80 mb-2">Detailed Intel Report</div>
            <h2 className="text-4xl text-value text-white font-display uppercase tracking-wider">{escalation.id}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-white/5 bg-white/2">
              <div className="text-label mb-4">Threat Vector</div>
              <div className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] border font-display ${escalation.badgeColor}`}>
                {escalation.badgeText}
              </div>
              <div className="mt-6 text-zinc-500 text-[11px] font-semibold uppercase tracking-widest font-mono">Detected: {escalation.time}</div>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-white/2">
              <div className="text-label mb-4">Risk Matrix</div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-alert animate-pulse shadow-[0_0_15px_#FF3E3E]"></div>
                <span className="text-white text-value text-2xl font-display uppercase tracking-widest">CRITICAL_ESC</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-label">Agent Reasoning Log</div>
            <div className="bg-black/40 rounded-xl border border-white/5 p-6 text-[15px] text-zinc-400 leading-relaxed relative overflow-hidden font-sans">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-value text-8xl pointer-events-none font-display">AI</div>
              {escalation.reason}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-label">Offer Sequence</div>
            <div className="text-cyber-primary bg-black/40 rounded-xl border border-white/5 p-5 font-mono text-[13px] leading-relaxed tracking-tight shadow-inner system-log">
               {escalation.offers}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono">HISTORICAL_TIMELINE</div>
            <div className="space-y-4">
              {escalation.history && escalation.history.length > 0 ? (
                escalation.history.map((h, i) => (
                  <div key={i} className="bg-cyber-black/40 border border-cyber-border rounded-xl p-4 relative group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyber-primary/20 group-hover:bg-cyber-primary/60 transition-all"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-cyber-primary font-semibold text-[12px] uppercase font-display tracking-wider">{h.action}</span>
                      <span className="text-zinc-600 text-[10px] font-mono font-semibold uppercase">{new Date(h.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-[12px] text-zinc-400 font-mono leading-tight mb-3">{h.reason}</div>
                    <div className="flex gap-4 text-[10px] font-mono font-semibold uppercase">
                      <span className="text-zinc-500">RISK_SIG: <span className="text-cyber-warning font-display text-[12px]">{h.churn_risk}</span></span>
                      <span className="text-zinc-500">OUTCOME: <span className="text-cyber-secondary font-display text-[12px]">{h.result}</span></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-zinc-600 text-[11px] font-mono font-bold uppercase p-6 bg-cyber-black/40 rounded-xl border border-cyber-border text-center">
                  NO_RECORDS_FOUND
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/5 border-t border-white/5 flex gap-4">
          <button 
            onClick={() => { onClaim ? onClaim(escalation.id) : triggerAction(`Escalation ${escalation.id} assigned to Retention Specialist`); if(!onClaim) onClose(); }}
            className="flex-1 py-4 rounded-xl bg-cyber-primary text-cyber-black font-display text-lg uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all"
          >
            Assign Specialist
          </button>
          <button 
            onClick={onClose}
            className="px-10 py-4 rounded-xl border border-white/10 text-zinc-400 font-display text-lg uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChainOfThoughtTerminal = ({ logs = '' }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      ref={scrollRef}
      className="bg-cyber-black border border-cyber-border rounded-xl p-5 font-mono text-[12px] h-52 overflow-y-auto mb-6 relative custom-scrollbar border-l-2 border-l-cyber-primary shadow-inner"
    >
      <div className="sticky top-0 bg-cyber-black/80 backdrop-blur-sm pb-2 border-b border-cyber-border/20 mb-3">
        <div className="text-label text-cyber-primary/70">/ AGENT_REASONING_ENGINE / VERBOSE_MODE /</div>
      </div>
      <div className="text-zinc-600 mb-1 font-mono uppercase text-[10px] tracking-tight">$ SRE_AGENT_CORE --init --stream</div>
      <div className="text-zinc-600 mb-4 font-mono uppercase text-[10px] tracking-tight">$ CONNECTING_TO_ORCHESTRATOR... [OK]</div>
      <div className="text-cyber-primary whitespace-pre-wrap leading-relaxed opacity-90 system-log text-[13px]">
        {logs || 'Waiting for pipeline execution...'}
        <span className="inline-block w-2 h-3 bg-[#c5f82a] animate-pulse ml-1 align-middle"></span>
      </div>
    </div>
  );
};

export const AuditLogTable = ({ logs: auditLogs = [], searchTerm = '', onSearch = () => {} }) => {
  const defaultLogs = [
    { time: '2021-0-15 19:35:33', id: 'CUST-8924-Alpha', status: 'PASS', cid: '393', data: 'JetBrains Mono' },
    { time: '2021-0-15 18:35:33', id: 'CUST-2219-DELTA', status: 'WARN', cid: '422', data: 'JetBrains Mono' },
    { time: '2021-0-15 19:35:34', id: 'CUST-2219-DELTA', status: 'WARN', cid: '490', data: 'JetBrains Mono' },
    { time: '2021-0-15 18:35:33', id: 'CUST-2219-DELTA', status: 'PASS', cid: '493', data: 'JetBrains Mono' },
    { time: '2021-0-15 16:35:33', id: 'CUST-2219-DELTA', status: 'WARN', cid: '388', data: 'JetBrains Mono' },
    { time: '2021-0-15 16:35:33', id: 'CUST-2219-DELTA', status: 'FAIL', cid: '458', data: 'JetBrains Mono' },
  ];

  return (
    <div className="bg-cyber-surface border border-cyber-border rounded-xl p-5 flex-1 flex flex-col min-h-[400px] relative shadow-lg">
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyber-primary/30 pointer-events-none"></div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-label text-zinc-400 font-mono">/ GLOBAL_AUDIT_LOG / ACCESS_RECORDS</div>
        <div className="relative">
          <input 
            id="audit-log-search"
            type="text" 
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="FILTER_RECORDS..." 
            aria-label="Search audit logs"
            className="bg-cyber-black border border-cyber-border rounded-lg pl-10 pr-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-cyber-primary transition-colors w-64 system-log font-bold" 
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
            <label htmlFor="audit-log-search" className="sr-only">Search audit logs</label>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-xs text-zinc-500 border-collapse">
          <thead className="text-zinc-500 uppercase tracking-widest font-display sticky top-0 bg-cyber-surface z-10 border-b border-cyber-border">
            <tr>
              <th className="pb-4 text-[12px]">TIMESTAMP</th>
              <th className="pb-4 text-[12px]">ENTITY_ID</th>
              <th className="pb-4 text-[12px]">VECTOR</th>
              <th className="pb-4 text-[12px]">OP_CODE</th>
              <th className="pb-4 text-[12px]">INTEL_DATA</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {(auditLogs.length > 0 ? auditLogs : defaultLogs).map((log, i) => (
              <tr key={i} className="border-t border-cyber-border hover:bg-cyber-black transition-colors group">
                <td className="py-3 text-zinc-400">{log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : log.time}</td>
                <td className="py-3 text-zinc-200 font-bold">{log.user_id || log.id}</td>
                <td className="py-3">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-cyber-black text-[10px] uppercase tracking-wider ${
                    (log.risk_level === 'LOW' || log.status === 'PASS') ? 'bg-cyber-primary' : 
                    (log.risk_level === 'MEDIUM' || log.status === 'WARN') ? 'bg-cyber-warning' : 'bg-cyber-alert text-white'
                  }`}>
                    {log.risk_level || log.status}
                  </span>
                </td>
                <td className="py-3 text-zinc-400 group-hover:text-cyber-primary transition-colors">{log.action || log.cid}</td>
                <td className="py-3 text-zinc-500">{log.churn_risk ? (log.churn_risk * 100).toFixed(1) + '%' : log.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ActivityKPICard = ({ title, value, hasTrend = true }) => (
  <div className="bg-cyber-surface border border-cyber-border rounded-xl p-5 flex flex-col justify-between shadow-lg relative border-l-2 border-l-cyber-primary">
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/5"></div>
    <div className="text-label mb-2">{title}</div>
    <div className="flex items-end gap-2 mb-4">
      <div className="text-4xl text-cyber-primary font-display uppercase tracking-wider">{value}</div>
      {hasTrend && (
        <div className="text-cyber-primary flex items-center mb-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
        </div>
      )}
      {!hasTrend && <div className="w-2 h-2 bg-cyber-primary mb-3 shadow-[0_0_8px_rgba(197,248,42,0.6)]"></div>}
    </div>
    <div className="h-1.5 w-full bg-cyber-border rounded-full overflow-hidden">
      <div className="h-full bg-cyber-primary opacity-80" style={{width: '75%'}}></div>
    </div>
  </div>
);

const AGENT_CONFIG = {
  'XGBoostClassifier': { label: 'ML_MODEL', icon: <Shield size={10} />, color: 'text-cyber-primary border-cyber-primary/30 bg-cyber-primary/5' },
  'RiskAnalysisAgent': { label: 'RISK_ANALYSIS', icon: <Shield size={10} />, color: 'text-cyber-alert border-cyber-alert/30 bg-cyber-alert/5' },
  'DecisionAgent': { label: 'DECISION_ENGINE', icon: <Cpu size={10} />, color: 'text-cyber-secondary border-cyber-secondary/30 bg-cyber-secondary/5' },
  'StrategyPlanningAgent': { label: 'STRATEGY_PLANNER', icon: <Layers size={10} />, color: 'text-cyber-warning border-cyber-warning/30 bg-cyber-warning/5' },
  'SimulationAgent': { label: 'SIMULATION_TWIN', icon: <Activity size={10} />, color: 'text-cyber-warning border-cyber-warning/30 bg-cyber-warning/5' },
  'GovernanceEngine': { label: 'GOVERNANCE_GUARD', icon: <ShieldCheck size={10} />, color: 'text-cyber-secondary border-cyber-secondary/30 bg-cyber-secondary/5' },
  'ActionAgent': { label: 'EXECUTION_AGENT', icon: <Zap size={10} />, color: 'text-cyber-primary border-cyber-primary/30 bg-cyber-primary/5' },
  'OutcomeTracker': { label: 'OUTCOME_TRACKER', icon: <Activity size={10} />, color: 'text-zinc-400 border-zinc-400/30 bg-zinc-400/5' },
  'HumanSpecialist': { label: 'HUMAN_EXPERT', icon: <User size={10} />, color: 'text-cyber-primary border-cyber-primary/30 bg-cyber-primary/5' },
  'SystemAgent': { label: 'CORE_KERNEL', icon: <Info size={10} />, color: 'text-zinc-500 border-zinc-500/30 bg-zinc-500/5' }
};

export const LiveEventCard = (props) => {
  const { 
    id, agentId, type, reasoning, confidence, chainId, timestamp, status, score, metadata, onChainClick 
  } = props;

  const agent = AGENT_CONFIG[agentId] || AGENT_CONFIG['SystemAgent'];
  const statusColor = status === 'FAIL' ? 'border-cyber-alert/50' : status === 'WARN' ? 'border-cyber-warning/50' : 'border-cyber-primary/20';
  
  const displayTime = timestamp || '00:00:00';
  const displayId = id ? (id.toString().includes('.') ? `CUST-${id.toString().split('.')[0].slice(-4)}` : id.toString().slice(0, 10)) : 'SYS_KERNEL';

  return (
    <div 
      className={`bg-cyber-surface border ${statusColor} rounded-xl p-4 mb-3 flex flex-col gap-3 group hover:bg-cyber-black transition-all relative overflow-hidden animate-event-in shadow-lg cursor-pointer border-l-4 ${status === 'FAIL' ? 'border-l-cyber-alert' : 'border-l-cyber-primary'}`}
      onClick={() => onChainClick && onChainClick(chainId)}
    >
      {/* HUD Scanner Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-primary/5 to-transparent h-1/2 animate-scan"></div>
      </div>

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-mono text-[10px] font-bold tracking-widest uppercase ${agent.color}`}>
            {agent.icon}
            {agent.label}
          </div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">/ {type || 'OP'}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600">
          <Clock size={10} />
          <span className="text-[10px] font-mono font-bold tracking-tight">{displayTime}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex justify-between items-start">
          <div className="text-[13px] text-zinc-200 font-medium leading-relaxed line-clamp-2 flex-1 system-log">
            {reasoning || props.message || props.desc}
          </div>
          {score && (
            <div className="ml-4 flex flex-col items-end p-2 bg-cyber-black border border-cyber-border">
              <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-[0.2em] mb-0.5">RISK_SIG</span>
              <span className="text-xs font-mono font-bold text-cyber-primary">{score}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-6 mt-1 border-t border-cyber-border pt-2">
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-zinc-600 uppercase font-bold font-mono">TARGET_ID:</span>
            <span className="text-[11px] text-zinc-300 font-mono font-bold tracking-tighter uppercase">{displayId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link2 size={10} className="text-zinc-600" />
            <span className="text-[9px] text-zinc-600 uppercase font-bold font-mono">CHAIN_LINK:</span>
            <span className="text-[11px] text-cyber-primary font-mono font-bold tracking-tighter">{chainId || 'RET-0000'}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 relative z-10">
        <div className="flex gap-2">
          {type === 'GOVERNANCE' ? (
            <div className="flex gap-2">
              <div className={`px-2 py-0.5 rounded border text-[8px] font-mono font-bold uppercase ${metadata?.roi_status === 'PASS' ? 'text-cyber-primary border-cyber-primary/20 bg-cyber-primary/5' : 'text-cyber-alert border-cyber-alert/20 bg-cyber-alert/5'}`}>
                ROI: {metadata?.roi_status || 'PASS'}
              </div>
              <div className={`px-2 py-0.5 rounded border text-[8px] font-mono font-bold uppercase ${metadata?.policy_compliance === 'PASS' ? 'text-cyber-primary border-cyber-primary/20 bg-cyber-primary/5' : 'text-cyber-alert border-cyber-alert/20 bg-cyber-alert/5'}`}>
                POLICY: {metadata?.policy_compliance || 'PASS'}
              </div>
              <div className={`px-2 py-0.5 rounded border text-[8px] font-mono font-bold uppercase ${metadata?.hallucination_risk === 'LOW' ? 'text-cyber-primary border-cyber-primary/20 bg-cyber-primary/5' : 'text-cyber-alert border-cyber-alert/20 bg-cyber-alert/5'}`}>
                RISK: {metadata?.hallucination_risk || 'LOW'}
              </div>
            </div>
          ) : (
            metadata && Object.entries(metadata).slice(0, 2).map(([key, val]) => (
              <div key={key} className="bg-cyber-black px-1.5 py-0.5 rounded-full border border-cyber-border text-[8px] text-zinc-500 font-mono font-bold uppercase">
                {key.slice(0, 4)}: {val.toString().slice(0, 8)}
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col items-end min-w-[80px]">
          <div className="flex justify-between w-full mb-1">
            <span className="text-[8px] text-zinc-600 uppercase font-bold">CONFIDENCE</span>
            <span className={`text-[10px] font-mono font-bold ${parseFloat(confidence) > 80 ? 'text-cyber-primary' : 'text-cyber-warning'}`}>
              {confidence || '92.4%'}
            </span>
          </div>
          <div className="w-full h-1 bg-cyber-black rounded-full overflow-hidden">
            <div 
              className={`h-full ${parseFloat(confidence) > 80 ? 'bg-cyber-primary' : 'bg-cyber-warning'}`} 
              style={{ width: confidence || '92.4%' }}
            ></div>
          </div>
        </div>
      </div>

      {status === 'FAIL' && type === 'GOVERNANCE' && (
        <div className="mt-2 p-2 bg-cyber-alert/10 border border-cyber-alert/30 rounded flex items-center gap-2 animate-pulse">
          <AlertTriangle size={12} className="text-cyber-alert" />
          <span className="text-[9px] font-mono font-bold text-cyber-alert uppercase tracking-tighter">
            CRITICAL_GOVERNANCE_FAILURE: HUMAN_HANDOFF_REQUIRED
          </span>
        </div>
      )}
    </div>
  );
};

export const DecisionTimeline = ({ events, onClose }) => {
  if (!events || events.length === 0) return null;

  const chainId = events[0].chainId;
  const sortedEvents = [...events].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime() || 0;
    const timeB = new Date(b.timestamp).getTime() || 0;
    return timeA - timeB;
  });

  // Calculate stats for the header
  const avgConfidence = (sortedEvents.reduce((acc, curr) => acc + parseFloat(curr.confidence || 0), 0) / sortedEvents.length).toFixed(1);
  const totalDuration = sortedEvents.reduce((acc, curr) => acc + parseFloat(curr.metadata?.duration || 0), 0).toFixed(2);
  const isComplete = sortedEvents.some(e => e.metadata?.node === 'END' || e.agentId === 'OutcomeTracker');

  return (
    <div className="flex flex-col gap-0 h-full overflow-hidden bg-[#070c08] relative border-0">
      {/* Dynamic Header with Trace Stats */}
      <div className="flex justify-between items-center p-6 border-b border-cyber-primary/20 bg-cyber-black/80 backdrop-blur-xl z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 ${isComplete ? 'bg-cyber-primary' : 'bg-cyber-warning animate-pulse'} shadow-[0_0_15px_currentColor] rounded-full`}></div>
            <h3 className="text-xl text-value text-white uppercase">
              WORKFLOW_TRACE <span className="text-cyber-primary">[{chainId}]</span>
            </h3>
          </div>
          <div className="flex gap-4 mt-2 pl-7">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cyber-primary/5 border border-cyber-primary/20">
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">AVG_CONFIDENCE</span>
              <span className="text-[11px] text-cyber-primary font-mono font-bold">{avgConfidence}%</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cyber-secondary/5 border border-cyber-secondary/20">
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">TOTAL_LATENCY</span>
              <span className="text-[11px] text-cyber-secondary font-mono font-bold">{totalDuration}s</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary hover:text-cyber-black transition-all text-zinc-600 flex items-center justify-center group"
          aria-label="Close trace"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 pt-10 custom-scrollbar relative">
        {/* The Timeline Track - Animated Filling */}
        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-cyber-border/20"></div>
        <div 
          className="absolute left-[39px] top-0 w-px bg-cyber-primary shadow-[0_0_10px_#c5f82a] transition-all duration-1000 ease-out"
          style={{ height: `${(sortedEvents.length / 7) * 100}%` }}
        ></div>
        
        <div className="flex flex-col gap-10 relative">
          {sortedEvents.map((event, idx) => {
            const agent = AGENT_CONFIG[event.agentId] || AGENT_CONFIG['SystemAgent'];
            const isFailed = event.status === 'FAIL';
            const isLatest = idx === sortedEvents.length - 1;
            
            return (
              <div 
                key={event.id} 
                className={`relative flex gap-10 group animate-in slide-in-from-left-4 duration-500`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Timeline Node Point */}
                <div className="relative z-10 shrink-0">
                  <div className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-500 ${
                    isFailed ? 'bg-cyber-alert/20 border-cyber-alert shadow-[0_0_15px_rgba(255,62,62,0.4)]' : 
                    isLatest ? 'bg-cyber-primary border-cyber-primary shadow-[0_0_20px_rgba(197,248,42,0.5)]' : 
                    'bg-cyber-black border-cyber-primary/40'
                  }`}>
                    {isFailed ? <AlertCircle size={14} className="text-cyber-alert" /> : 
                     isLatest ? <Zap size={14} className="text-cyber-black animate-pulse" /> : 
                     <CheckCircle size={14} className="text-cyber-primary/60" />}
                  </div>
                  {idx < sortedEvents.length - 1 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-b from-cyber-primary/40 to-transparent"></div>
                  )}
                </div>

                {/* Event Card */}
                <div className={`flex-1 bg-cyber-surface border rounded-xl p-0 transition-all duration-300 hover:translate-x-1 ${
                  isFailed ? 'border-cyber-alert/40' : 'border-cyber-border group-hover:border-cyber-primary/40'
                } shadow-xl relative overflow-hidden`}>
                  
                  {/* Agent Header */}
                  <div className={`px-4 py-2 border-b flex justify-between items-center ${
                    isFailed ? 'bg-cyber-alert/5 border-cyber-alert/20' : 'bg-white/5 border-cyber-border'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 border ${agent.color}`}>
                        {agent.icon}
                      </div>
                      <span className="text-label !text-white !font-bold">
                        {agent.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-tighter">EXEC_TIME</span>
                        <span className="text-[10px] text-zinc-400 font-mono font-bold">{event.timestamp}</span>
                      </div>
                      <div className={`h-6 w-px ${isFailed ? 'bg-cyber-alert/20' : 'bg-cyber-border'}`}></div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-tight">STATUS_VECTOR</span>
                        <span className={`text-[11px] font-bold font-mono ${isFailed ? 'text-cyber-alert' : 'text-cyber-primary'}`}>
                          {isFailed ? 'ERR_INTERRUPT' : 'SIGNAL_STABLE'}
                        </span>
                      </div>
                    </div>
                  </div>

                    {/* Reasoning Body */}
                    <div className="p-5">
                      <div className="text-[12px] text-zinc-200 font-bold leading-relaxed mb-4 font-mono uppercase tracking-tight relative">
                        <div className="absolute -left-5 top-0 bottom-0 w-1 bg-cyber-primary/20"></div>
                        {event.reasoning || event.message}
                      </div>

                      {/* Governance Specific Logic Panel */}
                      {event.type === 'GOVERNANCE' && (
                        <div className="mb-6">
                          <GovernanceReasoningPanel data={event} />
                        </div>
                      )}

                      {/* Metadata Grid */}
                      <div className="grid grid-cols-4 gap-4 pt-4 border-t border-cyber-border/40">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Confidence</span>
                        <div className="flex items-center gap-2">
                           <span className={`text-[11px] font-mono font-bold ${parseFloat(event.confidence) > 80 ? 'text-cyber-primary' : 'text-cyber-warning'}`}>
                            {event.confidence}
                          </span>
                          <div className="flex-1 h-1 bg-cyber-black max-w-[40px] rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${parseFloat(event.confidence) > 80 ? 'bg-cyber-primary' : 'bg-cyber-warning'}`} 
                              style={{ width: event.confidence }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Latency</span>
                        <span className="text-[11px] text-zinc-300 font-mono font-bold">
                          {event.metadata?.duration || '0.12s'}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Retries</span>
                        <span className="text-[11px] text-zinc-300 font-mono font-bold">
                          {event.metadata?.retries?.toString().padStart(2, '0') || '00'}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Workflow_ID</span>
                        <span className="text-[11px] text-cyber-primary/70 font-mono font-bold truncate tracking-tighter">
                          {chainId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Scanline */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyber-primary/0 via-cyber-primary/2 to-cyber-primary/0 h-[200%] animate-scan opacity-20"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="p-4 bg-cyber-black border-t border-cyber-border flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-700">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-cyber-primary rounded-full"></div>
            <span>NODE_INTEGRITY: VERIFIED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-cyber-primary rounded-full"></div>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyber-primary/30 font-mono">SENTIENT_RETENTION_ENGINE // AI_OBSERVABILITY_v4.2</span>
          <div className="w-2 h-2 bg-cyber-primary/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const WorkflowChainOverlay = ({ events, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Content Container */}
      <div className="relative w-full max-w-2xl bg-[#0a120d] border border-[#c5f82a]/30 shadow-[0_0_100px_rgba(197,248,42,0.15)] rounded-2xl overflow-hidden animate-scale-up">
        {/* Frame Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c5f82a] z-50 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c5f82a] z-50 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c5f82a] z-50 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c5f82a] z-50 rounded-br-2xl"></div>
        
        <DecisionTimeline events={events} onClose={onClose} />
      </div>
    </div>
  );
};
export const GovernanceReasoningPanel = ({ data }) => {
  if (!data) return null;

  const metrics = [
    { label: 'ROI Threshold', value: data.metadata?.roi_status || 'PASS', status: data.metadata?.roi_status === 'PASS' ? 'success' : 'error' },
    { label: 'Policy Compliance', value: data.metadata?.policy_compliance || 'PASS', status: data.metadata?.policy_compliance === 'PASS' ? 'success' : 'error' },
    { label: 'Hallucination Risk', value: data.metadata?.hallucination_risk || 'LOW', status: data.metadata?.hallucination_risk === 'LOW' ? 'success' : 'error' },
    { label: 'Customer Sensitivity', value: data.metadata?.sensitivity || 'HIGH', status: 'info' }
  ];

  return (
    <div className="bg-[#0a120d] border border-cyber-border rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-cyber-black p-4 border-b border-cyber-border flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-cyber-secondary" size={18} />
          <h4 className="text-sm font-display text-white tracking-widest uppercase">Governance_Audit_Panel</h4>
        </div>
        <div className="px-2 py-0.5 bg-cyber-secondary/10 border border-cyber-secondary/30 rounded text-[9px] font-mono text-cyber-secondary font-bold">
          ID: {data.chainId}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-3 rounded-lg group hover:border-cyber-primary/30 transition-all">
              <div className="text-[8px] text-zinc-500 font-bold uppercase tracking-tighter mb-1">{m.label}</div>
              <div className={`text-sm font-mono font-bold ${m.status === 'success' ? 'text-cyber-primary' : m.status === 'error' ? 'text-cyber-alert' : 'text-cyber-secondary'}`}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Validation_Logic_Output</div>
          <div className="p-4 bg-black/40 border border-white/5 rounded-lg text-xs text-zinc-300 leading-relaxed font-mono italic">
            "{data.reasoning}"
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-600 font-bold uppercase">System_Action</span>
            <span className={`text-[11px] font-mono font-bold ${data.status === 'PASS' ? 'text-cyber-primary' : 'text-cyber-alert'}`}>
              {data.status === 'PASS' ? 'PROCEED_TO_EXECUTION' : 'TRIGGER_HUMAN_HANDOFF'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${data.status === 'PASS' ? 'bg-cyber-primary' : 'bg-cyber-alert'} animate-pulse`}></div>
            <span className="text-[10px] font-display text-white tracking-wider uppercase">{data.status === 'PASS' ? 'Clearance_Level_Alpha' : 'Handoff_Protocol_Active'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
