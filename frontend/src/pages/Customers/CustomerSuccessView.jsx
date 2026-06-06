import React, { useState, useEffect } from 'react';
import { 
  Users, AlertCircle, Shield, Search, Filter, 
  CheckCircle, Clock, LayoutGrid, List, Activity, 
  ArrowRight, UserCheck, MessageSquare, Plus, Zap, 
  CheckSquare, Square, DollarSign, TrendingUp, HelpCircle,
  Play, Calendar, ShieldAlert, Award, FileText, ChevronDown, Check, Cpu
} from 'lucide-react';

const CustomerSuccessView = ({
  csCustomers,
  setCsCustomers,
  selectedCsIds,
  setSelectedCsIds,
  csSearchQuery,
  setCsSearchQuery,
  csPriorityFilter,
  setCsPriorityFilter,
  csStatusFilter,
  setCsStatusFilter
}) => {
  // Sort states
  const [sortField, setSortField] = useState('revenueExposure');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Terminal log state for simulated execution
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Selected customer for timeline details view
  const [activeCustomerId, setActiveCustomerId] = useState('cs-101');

  // Helper to format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Find active customer object
  const activeCustomer = csCustomers.find(c => c.id === activeCustomerId);

  // Generate dynamic, outcome-focused revenue protection timeline events
  const getCustomerTimeline = (customer) => {
    if (!customer) return [];
    
    const formattedRevenue = formatCurrency(customer.revenueExposure);
    
    return [
      {
        time: '09:12',
        title: 'Customer Risk Detected',
        agent: 'Telemetry Node-4',
        confidence: '98%',
        impact: `Detected health score decline to ${customer.healthScore} and a last active status of ${customer.lastActive}.`,
        outcome: `${formattedRevenue} ARR flagged at risk`,
        status: 'resolved'
      },
      {
        time: '09:13',
        title: 'AI Churn Analysis Completed',
        agent: 'Sentient Churn Predictor v2',
        confidence: `${Math.round(customer.churnProbability * 100)}%`,
        impact: `Churn probability calculated at ${(customer.churnProbability * 100).toFixed(0)}%. Identified primary drivers: decrease in active engineering licenses and support ticket backlog for POC ${customer.contactPerson}.`,
        outcome: `Financial impact validated at ${formattedRevenue} ARR`,
        status: 'resolved'
      },
      {
        time: '09:14',
        title: 'Retention Strategy Generated',
        agent: 'AI Success Planner Node',
        confidence: '92%',
        impact: `Synthesized custom playbook path: "${customer.recommendedAction}"`,
        outcome: `Targeted recovery: ${formattedRevenue} ARR`,
        status: 'resolved'
      },
      {
        time: '09:15',
        title: 'Simulation Completed',
        agent: 'Sim-Engine Sandbox',
        confidence: '86%',
        impact: `Simulated outreach playbook impact. Calculated customer response probability: 84% positive resolution if engaged.`,
        outcome: `Projected recovery ARR: ${formatCurrency(customer.revenueExposure * 0.9)}`,
        status: 'resolved'
      },
      {
        time: '09:16',
        title: 'Intervention Approved',
        agent: 'Admin Override Approval',
        confidence: '100%',
        impact: customer.interventionStatus === 'Pending Action' 
          ? 'System is waiting for manual trigger or specialist claim. Action queued.' 
          : `Intervention approved and executed as "${customer.interventionStatus}".`,
        outcome: customer.interventionStatus === 'Pending Action' ? 'Awaiting Specialist Approval' : 'Action Initiated',
        status: customer.interventionStatus === 'Pending Action' ? 'pending' : 'resolved'
      },
      {
        time: '09:18',
        title: customer.interventionStatus === 'Success Plan Created' 
          ? 'Customer Retained' 
          : (customer.interventionStatus === 'Outreach Scheduled' || customer.interventionStatus === 'Escalated' ? 'Intervention Active' : 'Status Pending'),
        agent: 'Retention Coordinator Node',
        confidence: customer.interventionStatus === 'Success Plan Created' ? '95%' : 'TBD',
        impact: customer.interventionStatus === 'Success Plan Created'
          ? `Outreach completed successfully. Success plan active. Churn risk reduced to <10%.`
          : (customer.interventionStatus === 'Outreach Scheduled'
            ? `Outreach call scheduled with ${customer.contactPerson}. Automation campaign running.`
            : (customer.interventionStatus === 'Escalated'
              ? `Account case escalated to Lead Customer Success Specialist. Telemetry monitoring active.`
              : 'Awaiting execution of recommended strategy.')),
        outcome: customer.interventionStatus === 'Success Plan Created'
          ? `Revenue Protected: ${formattedRevenue} ARR`
          : (customer.interventionStatus === 'Outreach Scheduled' || customer.interventionStatus === 'Escalated'
            ? `In-Flight Target: ${formattedRevenue} ARR`
            : `Awaiting action`),
        status: customer.interventionStatus === 'Success Plan Created' 
          ? 'resolved' 
          : (customer.interventionStatus === 'Outreach Scheduled' || customer.interventionStatus === 'Escalated' ? 'active' : 'pending')
      }
    ];
  };

  // Filtered and sorted data
  const filteredCustomers = csCustomers
    .filter(cust => {
      const matchesSearch = 
        cust.name.toLowerCase().includes(csSearchQuery.toLowerCase()) ||
        cust.domain.toLowerCase().includes(csSearchQuery.toLowerCase()) ||
        cust.contactPerson.toLowerCase().includes(csSearchQuery.toLowerCase());
      
      const matchesPriority = csPriorityFilter === 'All' || cust.priority === csPriorityFilter;
      const matchesStatus = csStatusFilter === 'All' || cust.interventionStatus === csStatusFilter;
      
      return matchesSearch && matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Calculate Aggregates based on FILTERED data
  const totalExposure = filteredCustomers.reduce((acc, curr) => acc + curr.revenueExposure, 0);
  const avgChurnRisk = filteredCustomers.length > 0
    ? (filteredCustomers.reduce((acc, curr) => acc + curr.churnProbability, 0) / filteredCustomers.length)
    : 0;
  const criticalCount = filteredCustomers.filter(c => c.priority === 'Critical').length;
  const pendingInterventions = filteredCustomers.filter(c => c.interventionStatus === 'Pending Action').length;

  // Toggle single selection
  const handleSelectRow = (id) => {
    if (selectedCsIds.includes(id)) {
      setSelectedCsIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedCsIds(prev => [...prev, id]);
    }
  };

  // Toggle select all on active filtered page
  const handleSelectAll = () => {
    const activeIds = filteredCustomers.map(c => c.id);
    const allSelectedOnPage = activeIds.every(id => selectedCsIds.includes(id));
    
    if (allSelectedOnPage) {
      // Remove all active ids
      setSelectedCsIds(prev => prev.filter(id => !activeIds.includes(id)));
    } else {
      // Add all active ids
      setSelectedCsIds(prev => {
        const union = new Set([...prev, ...activeIds]);
        return Array.from(union);
      });
    }
  };

  const executeBulkAction = (actionType) => {
    if (selectedCsIds.length === 0) return;
    
    setIsExecuting(true);
    setTerminalOpen(true);
    setTerminalLogs([]);

    const selectedNames = csCustomers
      .filter(c => selectedCsIds.includes(c.id))
      .map(c => c.name);

    const logs = [
      `[INIT] Booting Customer Success Agent v4.12...`,
      `[INFO] Target: ${selectedCsIds.length} high-risk accounts (${selectedNames.join(', ')}).`,
      `[INFO] Action requested: ${actionType.toUpperCase()}`,
      `[CONNECTING] Connecting to Sentient Agent Node...`,
    ];

    // Build timeline of logs
    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        setTerminalLogs(prev => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(interval);
        // Continue simulation based on action type
        simulateActionSteps(actionType);
      }
    }, 400);
  };

  const simulateActionSteps = (actionType) => {
    const targets = csCustomers.filter(c => selectedCsIds.includes(c.id));
    let currentTargetIndex = 0;

    const runNextTarget = () => {
      if (currentTargetIndex < targets.length) {
        const target = targets[currentTargetIndex];
        const targetLogs = [];

        if (actionType === 'campaign') {
          targetLogs.push(`[CAMPAIGN] Compiling hyper-personalized outreach package for ${target.name}...`);
          targetLogs.push(`[CAMPAIGN] Targeting recipient: ${target.contactPerson}`);
          targetLogs.push(`[AGENT-DECISION] Recommended action selected: "${target.recommendedAction}"`);
          targetLogs.push(`[DISPATCH] Launching automated campaign via secure mail gateway...`);
          targetLogs.push(`[SUCCESS] Campaign successfully dispatched to ${target.domain}.`);
        } else if (actionType === 'outreach') {
          targetLogs.push(`[SCHEDULER] Opening calendar pipeline for ${target.name} check-in...`);
          targetLogs.push(`[SCHEDULER] Dispatching dynamic booking link to ${target.contactPerson}...`);
          targetLogs.push(`[SUCCESS] Success outreach session scheduled for ${target.name}.`);
        } else if (actionType === 'escalate') {
          targetLogs.push(`[GOVERNANCE] Raising alert priority for account ${target.name}...`);
          targetLogs.push(`[ROUTING] Assigning high-risk case ${target.id} to Customer Success Specialist...`);
          targetLogs.push(`[SUCCESS] Specialist assigned. Internal notification triggered.`);
        } else if (actionType === 'plan') {
          targetLogs.push(`[DOC-ENGINE] Generating custom Success Plan template...`);
          targetLogs.push(`[DOC-ENGINE] Injecting recommended action: "${target.recommendedAction}"`);
          targetLogs.push(`[SUCCESS] Success Plan doc compiled and attached to account portal.`);
        }

        let stepIndex = 0;
        const targetInterval = setInterval(() => {
          if (stepIndex < targetLogs.length) {
            setTerminalLogs(prev => [...prev, targetLogs[stepIndex]]);
            stepIndex++;
          } else {
            clearInterval(targetInterval);
            // Apply status mutation in-memory
            setCsCustomers(prev => prev.map(c => {
              if (c.id === target.id) {
                let newStatus = c.interventionStatus;
                let newHealth = c.healthScore;
                let newRisk = c.churnProbability;

                if (actionType === 'campaign') {
                  newStatus = 'Outreach Scheduled';
                  newHealth = Math.min(100, c.healthScore + 5);
                  newRisk = Math.max(0.01, c.churnProbability - 0.05);
                } else if (actionType === 'outreach') {
                  newStatus = 'Outreach Scheduled';
                  newHealth = Math.min(100, c.healthScore + 3);
                  newRisk = Math.max(0.01, c.churnProbability - 0.03);
                } else if (actionType === 'escalate') {
                  newStatus = 'Escalated';
                  newHealth = Math.min(100, c.healthScore + 2);
                  newRisk = Math.max(0.01, c.churnProbability - 0.02);
                } else if (actionType === 'plan') {
                  newStatus = 'Success Plan Created';
                  newHealth = Math.min(100, c.healthScore + 8);
                  newRisk = Math.max(0.01, c.churnProbability - 0.08);
                }

                return {
                  ...c,
                  interventionStatus: newStatus,
                  healthScore: newHealth,
                  churnProbability: parseFloat(newRisk.toFixed(2))
                };
              }
              return c;
            }));
            
            currentTargetIndex++;
            runNextTarget();
          }
        }, 300);
      } else {
        // Wrap up execution
        setTerminalLogs(prev => [
          ...prev, 
          `[COMPLETE] Successfully completed bulk operation: "${actionType.toUpperCase()}" on ${targets.length} targets.`,
          `[LOG] Execution pipeline closed.`
        ]);
        setIsExecuting(false);
        setSelectedCsIds([]); // Clear selections on complete
      }
    };

    runNextTarget();
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* ── KPI Aggregate Panel ── */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#0a110b] border border-[#1a281e] p-6 rounded-[2px] relative overflow-hidden group hover:border-[#c5f82a]/20 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-[#c5f82a]/5 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-[2px] border border-red-500/20 bg-red-500/5 text-red-400">
              <DollarSign size={18} />
            </div>
            <div className="text-[10px] font-bold text-red-400 uppercase tracking-[0.15em] font-display">Financial Exposure</div>
          </div>
          <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.15em] mb-1 font-display">At-Risk ARR</div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight">{formatCurrency(totalExposure)}</div>
        </div>

        <div className="bg-[#0a110b] border border-[#1a281e] p-6 rounded-[2px] relative overflow-hidden group hover:border-[#c5f82a]/20 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-[#c5f82a]/5 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-[2px] border border-orange-500/20 bg-orange-500/5 text-orange-400">
              <TrendingUp size={18} />
            </div>
            <div className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.15em] font-display">Churn Probability</div>
          </div>
          <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.15em] mb-1 font-display">Avg Churn Risk</div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight">{(avgChurnRisk * 100).toFixed(1)}%</div>
        </div>

        <div className="bg-[#0a110b] border border-[#1a281e] p-6 rounded-[2px] relative overflow-hidden group hover:border-[#c5f82a]/20 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-[#c5f82a]/5 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-[2px] border border-[#c5f82a]/20 bg-[#c5f82a]/5 text-[#c5f82a]">
              <ShieldAlert size={18} />
            </div>
            <div className="text-[10px] font-bold text-[#c5f82a] uppercase tracking-[0.15em] font-display">Severity Level</div>
          </div>
          <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.15em] mb-1 font-display">Critical Nodes</div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight">{criticalCount} <span className="text-xs text-gray-500 font-normal">Accounts</span></div>
        </div>

        <div className="bg-[#0a110b] border border-[#1a281e] p-6 rounded-[2px] relative overflow-hidden group hover:border-[#c5f82a]/20 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-[#c5f82a]/5 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-[2px] border border-cyan-500/20 bg-cyan-500/5 text-cyan-400">
              <Clock size={18} />
            </div>
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.15em] font-display">Success Operations</div>
          </div>
          <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.15em] mb-1 font-display">Pending Action</div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight">{pendingInterventions} <span className="text-xs text-gray-500 font-normal">Required</span></div>
        </div>
      </div>

      {/* ── Search, Filters, and Bulk Operations Bar ── */}
      <div className="bg-[#0a110b] border border-[#1a281e] p-6 rounded-[2px] flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-1 min-w-[300px] items-center gap-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input 
              type="text" 
              placeholder="Filter by customer name, domain, contact..."
              value={csSearchQuery}
              onChange={(e) => setCsSearchQuery(e.target.value)}
              className="w-full bg-[#060c08] border border-[#1a281e] rounded-[2px] py-2.5 pl-10 pr-4 text-xs font-mono text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#c5f82a]/30 transition-all"
            />
          </div>
          
          <select 
            value={csPriorityFilter}
            onChange={(e) => setCsPriorityFilter(e.target.value)}
            className="bg-[#060c08] border border-[#1a281e] rounded-[2px] text-xs font-bold text-gray-400 px-3 py-2.5 focus:outline-none focus:border-[#c5f82a]/30 font-display"
          >
            <option value="All">Priority: All</option>
            <option value="Critical">Priority: Critical</option>
            <option value="High">Priority: High</option>
            <option value="Medium">Priority: Medium</option>
            <option value="Low">Priority: Low</option>
          </select>

          <select 
            value={csStatusFilter}
            onChange={(e) => setCsStatusFilter(e.target.value)}
            className="bg-[#060c08] border border-[#1a281e] rounded-[2px] text-xs font-bold text-gray-400 px-3 py-2.5 focus:outline-none focus:border-[#c5f82a]/30 font-display"
          >
            <option value="All">Status: All</option>
            <option value="Pending Action">Status: Pending Action</option>
            <option value="Escalated">Status: Escalated</option>
            <option value="Success Plan Created">Status: Success Plan</option>
            <option value="Outreach Scheduled">Status: Outreach Scheduled</option>
          </select>
        </div>

        {/* ── Bulk Actions Group ── */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">
            {selectedCsIds.length} Selected
          </span>
          <div className="h-6 w-px bg-[#1a281e]" />
          <button 
            disabled={selectedCsIds.length === 0 || isExecuting}
            onClick={() => executeBulkAction('campaign')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-[2px] transition-all flex items-center gap-2 border ${
              selectedCsIds.length > 0 
                ? 'bg-[#c5f82a] text-[#0a110b] hover:shadow-[0_0_20px_rgba(197,248,42,0.3)] border-transparent' 
                : 'bg-transparent text-gray-700 border-gray-900 cursor-not-allowed'
            }`}
          >
            <Play size={10} />
            Launch Campaign
          </button>
          <button 
            disabled={selectedCsIds.length === 0 || isExecuting}
            onClick={() => executeBulkAction('outreach')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-[2px] transition-all flex items-center gap-2 border ${
              selectedCsIds.length > 0 
                ? 'bg-transparent text-[#c5f82a] border-[#c5f82a]/30 hover:bg-[#c5f82a]/10' 
                : 'bg-transparent text-gray-700 border-gray-900 cursor-not-allowed'
            }`}
          >
            <Calendar size={10} />
            Outreach Call
          </button>
          <button 
            disabled={selectedCsIds.length === 0 || isExecuting}
            onClick={() => executeBulkAction('escalate')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-[2px] transition-all flex items-center gap-2 border ${
              selectedCsIds.length > 0 
                ? 'bg-transparent text-orange-400 border-orange-500/20 hover:bg-orange-500/10' 
                : 'bg-transparent text-gray-700 border-gray-900 cursor-not-allowed'
            }`}
          >
            <Shield size={10} />
            Escalate Specialist
          </button>
          <button 
            disabled={selectedCsIds.length === 0 || isExecuting}
            onClick={() => executeBulkAction('plan')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-[2px] transition-all flex items-center gap-2 border ${
              selectedCsIds.length > 0 
                ? 'bg-transparent text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10' 
                : 'bg-transparent text-gray-700 border-gray-900 cursor-not-allowed'
            }`}
          >
            <FileText size={10} />
            Success Plan
          </button>
        </div>
      </div>

      {/* ── Main Container (Split Screen) ── */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Main Data Terminal Table */}
        <div className="col-span-12 lg:col-span-7 bg-[#0a110b] border border-[#1a281e] rounded-[2px] overflow-hidden self-start">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#060c08] border-b border-[#1a281e] text-[10px] text-gray-500 font-bold uppercase tracking-widest font-display">
                <tr>
                  <th className="p-5 w-12 text-center" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={handleSelectAll}
                      aria-label="Select all rows"
                      className="p-1 rounded hover:bg-white/5 transition-colors"
                    >
                      {filteredCustomers.length > 0 && filteredCustomers.every(c => selectedCsIds.includes(c.id)) ? (
                        <CheckSquare size={16} className="text-[#c5f82a]" />
                      ) : (
                        <Square size={16} className="text-gray-700" />
                      )}
                    </button>
                  </th>
                  <th className="p-5 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1.5">
                      Account Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </div>
                  </th>
                  <th className="p-5 cursor-pointer hover:text-white transition-colors text-center w-24" onClick={() => handleSort('healthScore')}>
                    <div className="flex items-center justify-center gap-1.5">
                      Health {sortField === 'healthScore' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </div>
                  </th>
                  <th className="p-5 cursor-pointer hover:text-white transition-colors text-center w-28" onClick={() => handleSort('revenueExposure')}>
                    <div className="flex items-center justify-center gap-1.5">
                      ARR Exposure {sortField === 'revenueExposure' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </div>
                  </th>
                  <th className="p-5 cursor-pointer hover:text-white transition-colors text-center w-28" onClick={() => handleSort('churnProbability')}>
                    <div className="flex items-center justify-center gap-1.5">
                      Risk {sortField === 'churnProbability' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </div>
                  </th>
                  <th className="p-5 w-32 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a281e] text-xs font-mono">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => {
                    const isSelected = selectedCsIds.includes(customer.id);
                    const isActive = activeCustomerId === customer.id;
                    const isCritical = customer.priority === 'Critical';
                    
                    // Color maps for dynamic visual UI
                    let healthColor = 'text-red-400';
                    let healthBg = 'bg-red-500/5 border-red-500/10';
                    if (customer.healthScore > 70) {
                      healthColor = 'text-[#c5f82a]';
                      healthBg = 'bg-[#c5f82a]/5 border-[#c5f82a]/10';
                    } else if (customer.healthScore > 50) {
                      healthColor = 'text-orange-400';
                      healthBg = 'bg-orange-500/5 border-orange-500/10';
                    }

                    let statusBadgeStyle = 'border-gray-800 text-gray-500 bg-gray-900/10';
                    if (customer.interventionStatus === 'Escalated') {
                      statusBadgeStyle = 'border-red-500/20 text-red-400 bg-red-500/5';
                    } else if (customer.interventionStatus === 'Outreach Scheduled') {
                      statusBadgeStyle = 'border-orange-500/20 text-orange-400 bg-orange-500/5';
                    } else if (customer.interventionStatus === 'Success Plan Created') {
                      statusBadgeStyle = 'border-[#c5f82a]/20 text-[#c5f82a] bg-[#c5f82a]/5';
                    }

                    return (
                      <tr 
                        key={customer.id} 
                        onClick={() => setActiveCustomerId(customer.id)}
                        className={`hover:bg-white/[0.02] cursor-pointer transition-colors group ${
                          isActive ? 'bg-[#c5f82a]/5 border-l border-l-[#c5f82a]' : ''
                        }`}
                      >
                        <td className="p-5 text-center" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => handleSelectRow(customer.id)}
                            aria-label={`Select ${customer.name}`}
                            className="p-1 rounded hover:bg-white/5 transition-colors"
                          >
                            {isSelected ? (
                              <CheckSquare size={16} className="text-[#c5f82a]" />
                            ) : (
                              <Square size={16} className="text-gray-700 group-hover:text-gray-500" />
                            )}
                          </button>
                        </td>
                        <td className="p-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white font-display leading-tight group-hover:text-[#c5f82a] transition-colors">
                              {customer.name}
                            </span>
                            <span className="text-[10px] text-gray-500 mt-0.5">{customer.domain}</span>
                            <span className="text-[9px] text-gray-600 mt-1 font-sans">
                              POC: {customer.contactPerson} • Active {customer.lastActive}
                            </span>
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          <span className={`inline-block px-3 py-1.5 rounded-[2px] border text-xs font-bold font-mono ${healthBg} ${healthColor}`}>
                            {customer.healthScore}
                          </span>
                        </td>
                        <td className="p-5 text-center text-gray-300 font-bold">
                          {formatCurrency(customer.revenueExposure)}
                        </td>
                        <td className="p-5">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-xs font-bold font-mono ${isCritical ? 'text-red-400' : 'text-orange-400'}`}>
                              {(customer.churnProbability * 100).toFixed(0)}%
                            </span>
                            <div className="w-16 h-1 bg-[#1a281e] rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${isCritical ? 'bg-red-500' : 'bg-orange-500'}`} 
                                style={{ width: `${customer.churnProbability * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-5 text-right">
                          <div className="flex flex-col items-end gap-1.5">
                            <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${
                              isCritical ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            }`}>
                              {customer.priority}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-1 rounded-[2px] border uppercase tracking-wider ${statusBadgeStyle}`}>
                              {customer.interventionStatus}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-20 text-center">
                      <div className="max-w-xs mx-auto">
                        <HelpCircle className="text-gray-700 mx-auto mb-3" size={30} />
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Zero Matches</div>
                        <div className="text-xs text-gray-600">No high-risk accounts fit current filter query parameters.</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Revenue Protection Timeline Panel */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          {activeCustomer ? (
            <div className="bg-[#0a110b] border border-[#1a281e] p-6 rounded-[2px] relative overflow-hidden flex flex-col h-full">
              {/* Corner HUD decorations */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c5f82a]/30 pointer-events-none" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c5f82a]/30 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c5f82a]/30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#c5f82a]/30 pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-[#1a281e] mb-6">
                <div>
                  <div className="text-[10px] font-bold text-[#c5f82a] uppercase tracking-[0.2em] font-display flex items-center gap-1.5">
                    <Activity size={12} className="text-[#c5f82a]" />
                    Revenue Protection Telemetry
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mt-1">
                    {activeCustomer.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                    activeCustomer.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                  }`}>
                    {activeCustomer.priority}
                  </span>
                  <div className="text-[9px] text-gray-500 mt-1 font-mono">{activeCustomer.domain}</div>
                </div>
              </div>

              {/* Summary Metrics Banner */}
              <div className="grid grid-cols-2 gap-4 mb-6 bg-[#060c08] border border-[#1a281e] p-4 rounded-[2px]">
                <div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-mono">Revenue Exposure</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">{formatCurrency(activeCustomer.revenueExposure)} ARR</div>
                </div>
                <div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-mono">Protection Outcome</div>
                  {activeCustomer.interventionStatus === 'Success Plan Created' ? (
                    <div className="text-sm font-bold text-[#c5f82a] font-mono mt-0.5 flex items-center gap-1">
                      <CheckCircle size={14} className="text-[#c5f82a]" />
                      RETAINED (100%)
                    </div>
                  ) : (
                    <div className="text-sm font-bold text-orange-400 font-mono mt-0.5 flex items-center gap-1">
                      <Clock size={14} className="animate-spin text-orange-400" style={{ animationDuration: '3s' }} />
                      IN-FLIGHT
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Timeline Stepper */}
              <div className="relative pl-8 space-y-6 flex-1 py-2">
                {/* Vertical connecting line */}
                <div className="absolute left-3.5 top-3 bottom-3 w-[2px] bg-[#1a281e]" />

                {getCustomerTimeline(activeCustomer).map((step, idx) => {
                  let statusBg = 'border-gray-800 bg-[#060c08] text-gray-600';
                  let contentOpacity = 'opacity-50';
                  let ringColor = '';

                  if (step.status === 'resolved') {
                    statusBg = 'border-[#c5f82a] bg-[#c5f82a] text-[#0a110b] shadow-[0_0_10px_rgba(197,248,42,0.2)]';
                    contentOpacity = 'opacity-100';
                  } else if (step.status === 'active') {
                    statusBg = 'border-orange-500 bg-[#060c08] text-orange-400';
                    contentOpacity = 'opacity-100';
                    ringColor = 'ring-2 ring-orange-500/20';
                  }

                  return (
                    <div key={idx} className={`relative transition-all duration-300 ${contentOpacity}`}>
                      {/* Node Indicator */}
                      <div className={`absolute -left-8 top-1 w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-mono z-10 transition-all ${statusBg} ${ringColor}`}>
                        {step.status === 'resolved' ? (
                          <Check size={12} strokeWidth={3} />
                        ) : step.status === 'active' ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                        ) : (
                          idx + 1
                        )}
                      </div>

                      {/* Event Card Content */}
                      <div className="bg-[#060c08] border border-[#1a281e] p-4 rounded-[2px] hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-xs font-bold text-white font-display">
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-mono text-gray-500 bg-[#0a110b] px-1.5 py-0.5 border border-[#1a281e]">
                            {step.time}
                          </span>
                        </div>

                        {/* Telemetry metadata row */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2.5 text-[9px] font-mono text-gray-500 border-b border-[#1a281e] pb-2">
                          <span className="flex items-center gap-1">
                            <Cpu size={10} className="text-gray-600 animate-pulse" />
                            {step.agent}
                          </span>
                          <span className="text-gray-700">•</span>
                          <span>
                            CONFIDENCE: <span className={step.status === 'resolved' ? 'text-[#c5f82a]' : 'text-gray-500'}>{step.confidence}</span>
                          </span>
                        </div>

                        {/* Detail text */}
                        <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                          {step.impact}
                        </p>

                        {/* Financial/Business Outcome */}
                        <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-gray-600 uppercase tracking-widest text-[8px]">Business Outcome</span>
                          <span className={`font-bold px-2 py-0.5 rounded-[2px] bg-white/[0.02] border border-[#1a281e] ${
                            step.status === 'resolved' 
                              ? (step.title.includes('Retained') || step.title.includes('Strategy') || step.title.includes('Risk') ? 'text-[#c5f82a]' : 'text-cyan-400') 
                              : 'text-gray-600'
                          }`}>
                            {step.outcome}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Telemetry Sync Indicator */}
              <div className="mt-6 pt-4 border-t border-[#1a281e] flex items-center justify-between text-[9px] font-mono text-gray-600">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeCustomer.interventionStatus === 'Success Plan Created' ? 'bg-[#c5f82a]' : 'bg-orange-500 animate-pulse'}`} />
                  SYNC_STATE: {activeCustomer.interventionStatus === 'Success Plan Created' ? 'RECOVERY_RESOLVED' : 'MONITORING_ACTIVE'}
                </div>
                <div>NODE_ID: {activeCustomer.id.toUpperCase()}</div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0a110b] border border-[#1a281e] p-12 rounded-[2px] text-center flex flex-col items-center justify-center h-full min-h-[300px]">
              <Activity className="text-gray-700 mb-3 animate-pulse" size={36} />
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">No Customer Selected</div>
              <div className="text-xs text-gray-600 max-w-xs">
                Select a high-risk customer from the log roster to view their real-time Revenue Protection timeline.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Monospaced Telemetry Terminal Console Drawer ── */}
      {terminalOpen && (
        <div className="bg-[#050a06] border border-[#1a281e] rounded-[2px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#080f0a] border-b border-[#1a281e] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5f82a] animate-pulse" />
              <span className="text-[9px] font-bold text-white uppercase tracking-widest font-mono">Agent Action Log Execution</span>
            </div>
            <button 
              onClick={() => setTerminalOpen(false)} 
              className="text-[10px] text-gray-600 hover:text-white uppercase tracking-widest font-mono"
            >
              [Close Window]
            </button>
          </div>
          <div className="p-6 h-48 overflow-y-auto font-mono text-[11px] text-[#c5f82a]/80 space-y-2 select-text custom-scrollbar">
            {terminalLogs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                {log}
              </div>
            ))}
            {isExecuting && (
              <div className="flex items-center gap-2 text-white/40">
                <span className="inline-block animate-bounce font-extrabold">...</span>
                <span>Executing automated action sequence</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSuccessView;
