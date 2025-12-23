"use client";
import AISentinel from "@/components/AISentinel";
import StrategyEngine from "@/components/StrategyEngine";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Server,
  Activity,
  Database,
  Globe,
  RefreshCcw,
  Search,
  Zap,
  Wifi,
  ShieldCheck,
} from "lucide-react";

interface PNode {
  pubkey: string;
  ip: string;
  storage: number;
  version: string;
  status: string;
  latency: number;
  country: string;
}

export default function Dashboard() {
  const [nodes, setNodes] = useState<PNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionMode, setConnectionMode] = useState<string>("Connecting...");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    setLoading(true);
    fetch("/api/nodes")
      .then((res) => res.json())
      .then((result) => {
        setNodes(result.data);
        setConnectionMode(result.mode);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalStorage = nodes.reduce((acc, node) => acc + node.storage, 0);
  const activeNodes = nodes.filter((n) => n.status === "Active").length;

  const filteredNodes = nodes.filter(
    (node) =>
      node.pubkey.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen p-4 md:p-8 font-sans bg-black text-white selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. AI SENTINEL (Diagnostics Layer) */}
        <section>
          <AISentinel nodes={nodes} />
        </section>

        {/* 2. HERO HEADER */}
        <header className="relative flex flex-col md:flex-row justify-between items-end gap-4 pb-6 border-b border-white/5">
          <div className="space-y-2">
            {/* CONNECTION BADGE */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-2 transition-colors duration-500 ${
                connectionMode === "Live Network"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    connectionMode === "Live Network"
                      ? "bg-emerald-400"
                      : "bg-amber-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    connectionMode === "Live Network"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                ></span>
              </span>
              {connectionMode.toUpperCase()}
            </div>

            <h1 className="text-5xl font-bold text-white tracking-tight">
              Xan
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Scan
              </span>
            </h1>
            <p className="text-slate-400 max-w-lg">
              Real-time telemetry and storage analytics for the Xandeum
              decentralized network.
            </p>
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg backdrop-blur-md transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCcw
              size={18}
              className={`text-emerald-400 ${
                loading
                  ? "animate-spin"
                  : "group-hover:rotate-180 transition-transform duration-500"
              }`}
            />
            <span className="font-medium text-sm">Sync Network</span>
          </button>
        </header>

        {/* 3. GLASS STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard
            title="Active Nodes"
            value={activeNodes}
            icon={<Zap className="text-yellow-400" size={24} />}
            trend="+12% this week"
          />
          <GlassCard
            title="Total Capacity"
            value={`${totalStorage} TB`}
            icon={<Database className="text-purple-400" size={24} />}
            trend="1.2 PB Available"
          />
          <GlassCard
            title="Regions"
            value={new Set(nodes.map((n) => n.country)).size}
            icon={<Globe className="text-blue-400" size={24} />}
            trend="Global Distribution"
          />
        </div>

        {/* 4. MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN: CHARTS (Takes up 2/3 width) */}
          <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" />
              Storage Distribution by Region
            </h3>
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nodes} barSize={40}>
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#34d399"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="country"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}TB`}
                  />
                  <Tooltip
                    cursor={{ fill: "#ffffff05" }}
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="storage"
                    radius={[6, 6, 0, 0]}
                    fill="url(#colorBar)"
                  >
                    {nodes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.status === "Active"
                            ? "url(#colorBar)"
                            : "#334155"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT COLUMN: STRATEGY & STATS (Takes up 1/3 width) */}
          <div className="space-y-6">
            {/* --- NEW STRATEGY ENGINE (Business Intelligence Layer) --- */}
            <StrategyEngine nodes={nodes} />

            {/* EXISTING NETWORK HEALTH CARD */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <ShieldCheck size={16} /> Network Health
              </h3>
              <div className="text-4xl font-bold text-white mb-1">98.2%</div>
              <p className="text-slate-400 text-sm">Uptime over last 24h</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[98%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>

            {/* PROTOCOL CARD */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Wifi size={16} /> Connection Protocol
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Method</span>
                  <span className="text-white font-mono">pRPC / Mock</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Endpoint</span>
                  <span className="text-emerald-400 font-mono text-xs">
                    api.xandeum.net
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Failover</span>
                  <span className="text-amber-400 font-mono">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. NODE REGISTRY TABLE */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Server size={18} className="text-blue-400" />
              Node Registry
            </h3>
            <div className="relative w-full sm:w-72">
              <Search
                className="absolute left-3 top-3 text-slate-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search PubKey or Country..."
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-5 font-medium">Status</th>
                  <th className="p-5 font-medium">Node ID</th>
                  <th className="p-5 font-medium">Region</th>
                  <th className="p-5 font-medium">IP Addr</th>
                  <th className="p-5 font-medium text-right">Storage</th>
                  <th className="p-5 font-medium text-right">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredNodes.map((node, i) => (
                  <tr
                    key={i}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                          node.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {node.status === "Active" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                        )}
                        {node.status}
                      </span>
                    </td>
                    <td className="p-5 font-mono text-slate-400 group-hover:text-white transition-colors">
                      {node.pubkey}
                    </td>
                    <td className="p-5 text-slate-300">
                      <span className="mr-2 text-base">
                        {getFlag(node.country)}
                      </span>
                      {node.country}
                    </td>
                    <td className="p-5 font-mono text-slate-500 text-xs">
                      {node.ip}
                    </td>
                    <td className="p-5 font-mono text-white text-right">
                      {node.storage} TB
                    </td>
                    <td className="p-5 text-right">
                      <span className="text-emerald-400 font-mono">
                        {node.latency}ms
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

// GLASS CARD COMPONENT
function GlassCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl hover:bg-slate-800/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-emerald-500/30 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-white mt-2 font-mono">
            {value}
          </h3>
        </div>
        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-emerald-500/10 transition-colors">
          {icon}
        </div>
      </div>
      <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
        <span className="w-1 h-4 bg-emerald-500 rounded-full inline-block mr-1"></span>
        {trend}
      </p>
    </div>
  );
}

function getFlag(country: string) {
  const flags: Record<string, string> = {
    Nigeria: "🇳🇬",
    Germany: "🇩🇪",
    USA: "🇺🇸",
    Singapore: "🇸🇬",
    UK: "🇬🇧",
    Japan: "🇯🇵",
    Brazil: "🇧🇷",
    Finland: "🇫🇮",
  };
  return flags[country] || "🌐";
}
