import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("order_id");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbl_order_form")
    .select("*")
    .eq("order_id", order_id)
    .eq("is_exist", true);
  if (error) {
 return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: data, error: error }, { status: 200 });
}
