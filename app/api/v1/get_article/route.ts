import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "0", 10);
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
  const search = req.nextUrl.searchParams.get("search") || "";

  console.log("Search:", search);
  console.log("Page:", page);
  console.log("Limit:", limit);

  const supabase = await createClient();

  let query = supabase
  .from("tbl_article")
  .select("*, tbl_customer(id, company_name)", { count: "exact" }) // ⬅️ LEFT JOIN
  .eq("is_exist", true)
  .order("created_at", { ascending: false })
  .range((page - 1) * limit, page * limit - 1);

// Apply search for both article_name & company_name
if (search) {
  query = query
    .or(`article_name.ilike.%${search}%`)
    .ilike("tbl_customer.company_name", `%${search}%`); // 🔥 Fix search for customer name
}

const { data, error, count } = await query;


  console.log("Returned Data:", data);

  // Handle error
  if (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return response
  return NextResponse.json({ data, total_count: count || 0 }, { status: 200 });
}
