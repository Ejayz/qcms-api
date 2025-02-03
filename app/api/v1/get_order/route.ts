import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "0", 10);
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
  const search = req.nextUrl.searchParams.get("search");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  const order = req.nextUrl.searchParams.get("order");
  const sort_by =
    req.nextUrl.searchParams.get("sort_by") == "Sort By"
      ? "created_at"
      : req.nextUrl.searchParams.get("sort_by") || "created_at";

  const supabase = await createClient();
  // let totalDataBasedOnQuery = 0;

  // Base query
  let query = supabase
    .from("tbl_orders_form")
    .select("* ,tbl_customer(*),tbl_article(*),tbl_production(*)", { count: "exact" })
    .eq("is_exist", true)
    .or(`order_fabrication_control.ilike.%${search}%`)
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  // Add search filter
  // if (search) {
  //   console.log("order_fabrication_control.ilike.%" + search + "%")
  //   query = query.eq("order_fabrication_control", search);
  // }
  if (sort_by == "company_name") {
    query = query.order(sort_by, {
      referencedTable: "tbl_customer",
      ascending: order == "Ascending",
    });
  } else {
    query = query.order(sort_by, { ascending: order == "Ascending" });
  }

  // Add date filters
  if (startDate && endDate) {
    const adjustedStartDate = `${startDate}T00:00:00`; // Ensure start of the day
    const adjustedEndDate = `${endDate}T23:59:59`; // Ensure end of the day
    query = query
      .gte("entry_date_time", adjustedStartDate)
      .lte("exit_date_time", adjustedEndDate);
  }

  const { data, error, count } = await query;
  console.log(data, error, count);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json(
      { data, total_count: count || 0 },
      { status: 200 }
    );
  }
}
