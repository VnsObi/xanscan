# XanScan | Strategic Intelligence Platform

![XanScan Dashboard](<img src="./dashboard.png" width="100%" alt="XanScan Dashboard">)

> **Beyond Telemetry.** XanScan is a next-generation analytics and decision-support platform for the Xandeum Decentralized Storage Network.

## 🚀 The Vision

Most blockchain explorers simply display lists of data. **XanScan** interprets that data.

Built for Node Operators and Network Architects, XanScan transforms raw pRPC telemetry into actionable **Business Intelligence**. It doesn't just show you _where_ the nodes are; it uses algorithmic analysis to tell you _where they should be_ to maximize yield and network resilience.

## 🌟 Key Innovations

### 1. 🧠 The Strategy Engine (Business Intelligence)

A first-of-its-kind "Yield Optimizer" module.

- **Market Saturation Analysis:** real-time algorithmic assessment of node density per geographic region.
- **ROI Forecasting:** Identifies "Under-served" regions and generates strategic directives (e.g., _"Deploy in Finland to maximize XAND yield"_).
- **Revenue Projection:** Estimates network-wide storage revenue based on current load and pNode distribution.

### 2. 🛡️ AI Sentinel (Diagnostic Layer)

A heuristic diagnostic engine that monitors the heartbeat of the network.

- **Resilience Scoring:** Calculates a live "Health Score" (0-100) based on latency variance, uptime, and distribution factors.
- **Anomaly Detection:** visualizes network state changes with a futuristic, terminal-style interface.

### 3. 🌐 Smart Connectivity Mesh

A robust networking layer designed for the fluctuating conditions of a Devnet.

- **Multi-Protocol Negotiation:** Automatically attempts connections via **pRPC (Port 6000)** and **HTTP**, with intelligent failover logic.
- **High-Fidelity Replay Mode:** Features a "Smart Fallback" system that seamlessly switches to cached high-fidelity snapshots during network resets, ensuring the dashboard never shows a blank screen to users.

---

## 🛠️ Technical Architecture

**Stack:**

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (Glassmorphism & Cyberpunk Aesthetics)
- **Visualization:** Recharts (Data-driven SVG charts)
- **Icons:** Lucide React

**Data Flow:**

1.  **Ingest:** Connects to `podcredits.xandeum.network` and direct pNode IP clusters.
2.  **Normalization:** Maps raw gossip data (bytes) into human-readable metrics (TB, Latency).
3.  **Intelligence:** Passes normalized data through the `StrategyEngine` and `AISentinel` logic layers.
4.  **Presentation:** Renders via a responsive, GPU-accelerated UI.

---

## ⚡ Getting Started

### Prerequisites

- Node.js v20+
- npm / yarn / bun

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/your-username/xanscan.git](https://github.com/your-username/xanscan.git)
    cd xanscan
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Open locally**
    Visit `http://localhost:3000` to see the dashboard live.

---

## 🗺️ Roadmap & Scalability

_Current implementation focuses on the Hackathon MVP/MLP._

- **Phase 1 (Complete):** Real-time client-side aggregation and Strategic Analysis UI.
- **Phase 2 (Planned):** Server-side Indexer (Redis/Postgres) to handle historical data retention and scale beyond 50,000 active nodes.
- **Phase 3 (Planned):** Direct wallet integration for "One-Click Node Deployment" based on Strategy Engine recommendations.

---

## 📄 License

This project is open-source and available under the MIT License.

---

_Built with ❤️ for the Xandeum Hackathon 2025._
