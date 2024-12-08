
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  const { order_id } = await req.json();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tbl_orders_form")
    .update({ is_exist: false })
    .eq("order_id", order_id);
    
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


