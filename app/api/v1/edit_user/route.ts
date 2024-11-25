import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const uuid = await req.nextUrl.searchParams.get("uuid");

  const supabase = await createClient();

  const body = await req.json();
  const { email, first_name, middle_name, last_name, role, suffix } = body;

  const { data, error } = await supabase
    .from("tbl_users")
    .update({
      email,
      first_name,
      middle_name,
      last_name,
      role,
      suffix,
    })

    .eq("uuid", uuid);

  if (error) {
    console.error("Error fetching user:", error.message);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  console.log("Fetched user data:", data);
  return NextResponse.json(data, { status: 200 });
}
