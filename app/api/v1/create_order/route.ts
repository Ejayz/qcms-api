import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request data
    const data = await req.json();
    const {
      customer_id,
      article_id,
      assignee,
      pallete_count,
      is_assigned,
      user,
    } = data;

    console.log(
      "Received Data:",
      customer_id,
      article_id,
      assignee,
      pallete_count
    );

    // Create Supabase client
    const supabase = await createClient();

    // Insert data into tbl_orders_form
    const { data: insertResult, error } = await supabase
      .from("tbl_orders_form")
      .insert([
        {
          customer_id: customer_id || null,
          article_id: article_id || null,
          assignee: assignee || null,
          pallete_count: pallete_count || 0, // Default to 0 if not provided
          is_exist: true, // Always true
        },
      ]);

    // Handle errors
    if (error) {
      console.error("Error inserting data:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Insert Result:", insertResult);

    // Return success response
    return NextResponse.json(
      { message: "Data inserted successfully", code: 200, data: insertResult },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { code: 500, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
