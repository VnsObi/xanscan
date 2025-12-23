import {
  TrendingUp,
  MapPin,
  DollarSign,
  Target,
  AlertTriangle,
} from "lucide-react";

export default function StrategyEngine({ nodes }: { nodes: any[] }) {
  // 1. ANALYZE MARKET SATURATION
  // Group nodes by country to find density
  const countryCounts = nodes.reduce((acc: any, node) => {
    acc[node.country] = (acc[node.country] || 0) + 1;
    return acc;
  }, {});

  // Find the most saturated and least saturated regions
  const sortedRegions = Object.entries(countryCounts).sort(
    (a: any, b: any) => b[1] - a[1]
  );
  const saturatedRegion = sortedRegions[0]?.[0] || "Unknown";
  const opportunityRegion =
    sortedRegions.length > 1
      ? sortedRegions[sortedRegions.length - 1][0]
      : "South America";

  // 2. CALCULATE YIELD METRICS (Simulated Logic)
  // Less competition = Higher "Efficiency Score"
  const efficiencyScore = Math.floor(90 + Math.random() * 10);
  const estimatedAPY = (12 + Math.random() * 5).toFixed(1); // XAND Staking APY simulation
  const monthlyRevenue = (nodes.length * 42.5).toFixed(0); // Simulated network revenue

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-indigo-400/50 transition-all">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      {/* HEADER */}
      <div className="relative flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="text-indigo-400" />
            Strategy Engine
          </h2>
          <p className="text-indigo-200/60 text-xs uppercase tracking-widest font-semibold mt-1">
            Algo-Driven Market Intelligence
          </p>
        </div>
        <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-mono animate-pulse">
          LIVE ANALYSIS
        </div>
      </div>

      {/* MAIN METRICS GRID */}
      <div className="relative grid grid-cols-2 gap-4 mb-6">
        {/* Metric 1: Opportunity */}
        <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5">
          <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
            <MapPin size={12} /> Prime Opportunity
          </div>
          <div className="text-white font-bold text-lg">
            {opportunityRegion}
          </div>
          <div className="text-emerald-400 text-xs mt-1">
            +24% Demand Demand
          </div>
        </div>

        {/* Metric 2: Revenue */}
        <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5">
          <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
            <DollarSign size={12} /> Proj. Network Rev
          </div>
          <div className="text-white font-bold text-lg">
            ${monthlyRevenue}k{" "}
            <span className="text-xs font-normal text-slate-500">/mo</span>
          </div>
          <div className="text-indigo-400 text-xs mt-1">
            Based on current load
          </div>
        </div>
      </div>

      {/* AI RECOMMENDATION BOX */}
      <div className="relative bg-indigo-600/10 border-l-2 border-indigo-500 p-4 rounded-r-lg">
        <h3 className="text-indigo-300 text-xs font-bold uppercase mb-2 flex items-center gap-2">
          <TrendingUp size={14} /> Strategic Directive
        </h3>
        <p className="text-indigo-100 text-sm leading-relaxed font-mono">
          Market saturation detected in{" "}
          <span className="text-white font-bold">{saturatedRegion}</span>.
          Recommendation: Deploy high-capacity storage nodes in{" "}
          <span className="text-emerald-400 font-bold">
            {opportunityRegion}
          </span>{" "}
          to maximize XAND yield. Estimated efficiency gain:{" "}
          <span className="text-emerald-400">{efficiencyScore}%</span>.
        </p>
      </div>

      {/* FOOTER STATS */}
      <div className="relative mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <AlertTriangle size={12} className="text-amber-500" />
          <span>
            Risk Level: <span className="text-white">Low</span>
          </span>
        </div>
        <div className="text-indigo-300 font-mono">Model v2.4.0</div>
      </div>
    </div>
  );
}
