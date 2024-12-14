import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "0", 10);
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
  const search = req.nextUrl.searchParams.get("search");
  console.log(search);
  console.log(page);
  console.log(limit);
  const supabase = await createClient();
  const { data, error,count } = await supabase
    .from("tbl_article")
    .select("*",{count: "exact"})
    .eq("is_exist", true)
    .or(
      `article_name.ilike.%${search}%`
    )
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  console.log(data, error);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ data, total_count: count || 0 }, { status: 200 });
  }
}
