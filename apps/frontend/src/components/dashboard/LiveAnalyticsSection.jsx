import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { ModelCard, FeatureImportance, AuditLogTable } from './DashboardComponents';

const LiveAnalyticsSection = ({ data, auditLogs = [], searchTerm = '', onSearch = () => {} }) => {
  const { churnTrend, segmentDistribution, retentionImpact } = data;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f1712] border border-[#2a4230] p-3 rounded-lg shadow-2xl backdrop-blur-md">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full overflow-y-auto custom-scrollbar p-8">
      {/* Top Row: Main Trend */}
      <div className="bg-[#0f1712]/80 backdrop-blur-md border border-[#1a281e] rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Live Churn Propensity Trend</h3>
            <p className="text-xs text-gray-500">Real-time aggregate risk monitoring across all active segments</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f87171] shadow-[0_0_8px_#f87171]"></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Avg Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#c5f82a] shadow-[0_0_8px_#c5f82a]"></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Retention Rate</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={churnTrend}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c5f82a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#c5f82a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a281e" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="risk" 
                name="Risk"
                stroke="#f87171" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRisk)" 
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="retention" 
                name="Retention"
                stroke="#c5f82a" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRetention)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Middle Row: Distribution & Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f1712]/80 backdrop-blur-md border border-[#1a281e] rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-gray-200 mb-6 uppercase tracking-wider">Customer Segment Health</h3>
          <div className="h-[250px] w-full flex">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={segmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={200}
                  animationDuration={1000}
                >
                  {segmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 flex flex-col justify-center gap-4 pl-4">
              {segmentDistribution.map((seg, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }}></div>
                    <span className="text-xs text-gray-400 font-medium">{seg.name}</span>
                  </div>
                  <span className="text-xs text-white font-bold">{seg.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0f1712]/80 backdrop-blur-md border border-[#1a281e] rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-gray-200 mb-6 uppercase tracking-wider">Agent Retention Performance</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retentionImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a281e" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0f1712', border: '1px solid #2a4230', borderRadius: '8px' }}
                />
                <Bar dataKey="prevented" name="Prevented" fill="#c5f82a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lost" name="Lost" fill="#334155" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Model Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModelCard name="Churn_XGB_v4" latency="14ms" accuracy="94.2%" />
        <ModelCard name="Sentiment_LSTM" latency="42ms" accuracy="88.5%" accLabel="F1 Score" />
        <FeatureImportance />
      </div>

      {/* Audit Log Table Integration */}
      <div className="pb-12">
        <AuditLogTable logs={auditLogs} searchTerm={searchTerm} onSearch={onSearch} />
      </div>
    </div>
  );
};

export default LiveAnalyticsSection;
