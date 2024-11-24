import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { uuid: string } }) {
  console.log("API Route Hit: Fetching user with UUID:", params.uuid);

  if (!params.uuid || params.uuid.trim() === "") {
    return NextResponse.json({ error: "UUID is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tbl_users")
    .select("*")
    .eq("uuid", params.uuid.trim())
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  console.log("Fetched user data:", data);
  return NextResponse.json(data, { status: 200 });
}