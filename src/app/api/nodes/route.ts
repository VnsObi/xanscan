import { NextResponse } from "next/server";
import { fetchPNodeGossip } from "@/lib/xandeum";

export async function GET() {
  // We now expect an object { data: [], mode: '' }
  const result = await fetchPNodeGossip();

  // Return the whole result object
  return NextResponse.json(result);
}
