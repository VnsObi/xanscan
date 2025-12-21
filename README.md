# XanScan: Xandeum pNode Analytics Platform

XanScan is a real-time analytics dashboard for the Xandeum Storage Network. It visualizes the "Gossip" layer, allowing users to monitor pNode health, storage capacity, and geographic distribution.

## 🚀 Features

- **Live Node Registry**: Fetches pNode data via pRPC (simulated in demo mode).
- **Geo-Location Tracking**: Visualizes node distribution (Nigeria, Germany, USA, etc.).
- **Storage Analytics**: Charts showing capacity vs. active status.
- **Search & Filter**: Find nodes by Public Key or Country instantly.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Lucide Icons
- **Data**: @xandeum/web3.js (mock fallback for stability)

## 📦 How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```
