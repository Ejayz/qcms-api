import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = await req.nextUrl.searchParams.get("id");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tbl_production")
    .select()
    .eq("order_form_id", id)
    .eq("is_exist", true).order("created_at", { ascending: false });
    

  if (error) {
    console.error("Error fetching user:", error.message);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  console.log("Fetched user data:", data);
  return NextResponse.json(data, { status: 200 });
}
