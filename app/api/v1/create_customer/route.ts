import { createClient, roleExtractor } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request data
    const data = await req.json();
    const { first_name, last_name, email, middle_name, user_id } = data;

    console.log(
      "Received Data:",
      first_name,
      last_name,
      email,
      middle_name,
      user_id
    );

    // Create Supabase client
    const supabase = await createClient();

    // Verify user role
    const current_role = await roleExtractor(supabase);
    if (current_role !== "Super Admin") {
      return NextResponse.json(
        { error: "No permission to perform this action" },
        { status: 401 }
      );
    }
    // Check if the email already exists
    const { data: existingEmail, error: fetchError } = await supabase
      .from("tbl_customer")
      .select("email")
      .eq("email", email)
      .single();

    if (existingEmail) {
      console.log("Email already exists:", email);
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 } // Conflict status code
      );
    }
  
    // Insert data into tbl_customer
    const { data: insertResult, error: insertError } = await supabase
      .from("tbl_customer")
      .insert([
        {
          first_name: first_name || null,
          last_name: last_name || null,
          email: email || null,
          middle_name: middle_name || null,
          user_id: user_id,
          is_exist: true, // Always true
        },
      ]);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    console.log("Insert Result:", insertResult);

    // Return success response
    return NextResponse.json(
      { message: "Data inserted successfully", data: insertResult },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
