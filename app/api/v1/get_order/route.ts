import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") || "0";
  const limit = req.nextUrl.searchParams.get("limit") || "10";
  const search = req.nextUrl.searchParams.get("search");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

  const supabase = await createClient();

  // Base query
  let query = supabase
    .from("tbl_orders_form")
    .select("* ,tbl_customer(*),tbl_article(*)")
    .eq("is_exist", true)
    .order("created_at", { ascending: false })
    .range(
      (parseInt(page) - 1) * parseInt(limit),
      parseInt(page) * parseInt(limit) - 1
    );

  // Add search filter
  if (search) {
    query = query.or(`product_name.ilike.%${search}%`);
  }

  // Add date filters
  if (startDate) {
    query = query.gte("created_at", startDate);
  }
  if (endDate) {
    query = query.lte("created_at", endDate);
  }

  const { data, error } = await query;

  console.log(data, error);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json(data, {
      status: 200,
    });
  }
}
