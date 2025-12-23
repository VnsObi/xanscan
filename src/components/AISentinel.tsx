import { useState, useEffect } from "react";

export default function AISentinel({ nodes }: { nodes: any[] }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  // Run the "AI Analysis" whenever nodes change
  useEffect(() => {
    setAnalyzing(true);
    setReport([]);

    // Simulate complex calculation time
    setTimeout(() => {
      generateReport();
      setAnalyzing(false);
    }, 1500);
  }, [nodes]);

  const generateReport = () => {
    if (!nodes || nodes.length === 0) return;

    const totalStorage = nodes.reduce((acc, n) => acc + (n.storage || 0), 0);
    const avgLatency =
      nodes.reduce((acc, n) => acc + (n.latency || 0), 0) / nodes.length;
    const activeCount = nodes.filter((n) => n.status === "Active").length;

    // "AI" Logic to generate insights
    const insights = [
      `System Scan Complete: ${nodes.length} nodes analyzed.`,
      `Network Resilience: ${
        activeCount === nodes.length ? "MAXIMUM" : "STABLE"
      }.`,
      `Global Capacity: ${totalStorage} TB detected across distributed ledger.`,
      `Latency Optimization: ${
        avgLatency < 50 ? "Excellent" : "Moderate"
      } (${Math.floor(avgLatency)}ms avg).`,
    ];

    if (totalStorage > 100000) {
      insights.push("🚀 GROWTH ALERT: Network is entering hyper-scale phase.");
    } else {
      insights.push("ℹ️ STATUS: Network is in early-stage accumulation.");
    }

    setReport(insights);
    setScore(avgLatency < 50 ? 98 : 85);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative 'Scanner' Line */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent ${
          analyzing ? "animate-scan" : "opacity-0"
        }`}
      />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
            XanScan AI Sentinel
          </h2>
          <p className="text-slate-400 text-sm">
            Real-time heuristic network analysis
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            {analyzing ? "--" : score}
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">
            Health Score
          </div>
        </div>
      </div>

      <div className="space-y-3 font-mono text-sm">
        {analyzing ? (
          <div className="text-cyan-400 animate-pulse">
            Initializing neural handshake...
          </div>
        ) : (
          report.map((line, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-slate-300 border-b border-slate-800/50 pb-2 last:border-0"
            >
              <span className="text-cyan-500 mt-0.5">❯</span>
              <span>{line}</span>
            </div>
          ))
        )}
      </div>

      {/* Futuristic Footer */}
      <div className="mt-6 flex items-center gap-4 text-xs text-slate-600 font-mono border-t border-slate-800 pt-3">
        <span>PID: {Math.floor(Math.random() * 99999)}</span>
        <span>|</span>
        <span>MEM: {Math.floor(Math.random() * 50) + 10}%</span>
        <span>|</span>
        <span className="text-emerald-500">ENCRYPTION: ACTIVE</span>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
