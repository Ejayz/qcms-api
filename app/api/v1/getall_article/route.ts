import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  // Run the query to get articles from the table
  const { data, error, count } = await supabase
    .from("tbl_article")
    .select("*") // This enables total count of rows
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}
