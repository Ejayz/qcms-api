import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log(data,error)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401, statusText: "Login Failed" });
  }
  return NextResponse.json(data,{ status: 200, statusText: "Login Successful" });   
}
