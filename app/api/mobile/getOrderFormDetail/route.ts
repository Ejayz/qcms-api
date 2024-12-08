import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("order_id");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbl_order_form")
    .select("*")
    .eq("order_id", order_id)
    .eq("is_exist", true);
  if (error) {
    return {
      status: 500,
      data: { error: error.message },
    };
  }
  return {
    status: 200,
    data: data,
  };
}
