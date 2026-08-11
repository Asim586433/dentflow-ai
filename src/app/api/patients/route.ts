import { NextResponse } from "next/server";
import { mockPatients } from "@/lib/data";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase())
  );
  return NextResponse.json(filteredPatients);
}
