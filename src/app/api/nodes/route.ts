import { NextResponse } from "next/server";
import { fetchPNodeGossip } from "@/lib/xandeum";

export async function GET() {
  const nodes = await fetchPNodeGossip();
  return NextResponse.json(nodes);
}
