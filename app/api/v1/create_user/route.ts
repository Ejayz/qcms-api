import { createClient, roleExtractor } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, first_name, middle_name, last_name, role, suffix, password } =
    await req.json();
  console.log(
    email,
    first_name,
    middle_name,
    last_name,
    role,
    suffix,
    password
  );

  const supabase = await createClient();

  const current_role = await roleExtractor(supabase);
  if (current_role !== "Super Admin") {
    return NextResponse.json(
      { error: "No permission to do this action." },
      { status: 401 }
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        role: role,
      },
    },
  });

  console.log(error);
  console.log(data);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const insertUserDetails = await supabase.from("tbl_users").insert([
    {
      uuid: data.user?.id,
      email: email,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      role: role,
      suffix: suffix,
      is_exist: true,
    },
  ]);

  console.log(insertUserDetails);
  if (insertUserDetails.error) {
    return NextResponse.json(
      { error: insertUserDetails.error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, {
    status: 200,
  });
}
