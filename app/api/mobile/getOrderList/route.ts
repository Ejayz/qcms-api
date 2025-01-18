import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

  const supabase = await createClient();
  // let totalDataBasedOnQuery = 0;

  // Base query
  let query = supabase
    .from("tbl_orders_form")
    .select("* ,tbl_customer(company_name),tbl_article(id,user_id,is_exist,article_max,article_min,article_name,number_control,article_nominal)", { count: "exact" })
    .eq("is_exist", true)
    .or(`order_fabrication_control.ilike.%${search}%`)


  // Add date filters

  console.log(startDate, endDate);
  if(startDate ){
    const adjustedStartDate = `${startDate}T00:00:00`; // Ensure start of the day
    query = query
      .gte("created_at", adjustedStartDate)
  }


  if ( endDate) {
    const adjustedEndDate = `${endDate}T23:59:59`; // Ensure end of the day
    query = query
      .lte("created_at", adjustedEndDate);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json(
      { data, total_count: count || 0 },
      { status: 200 }
    );
  }
}
