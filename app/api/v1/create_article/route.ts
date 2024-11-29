import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request data
    const data = await req.json();
    const {
      article_nominal,
      article_min,
      article_max,
      number_control,
      user_id,
    } = data;

    console.log(
      "Received Data:",
      article_nominal,
      article_min,
      article_max,
      number_control,
      user_id
    );

    // Create Supabase client
    const supabase = await createClient();

    // Insert data into tbl_orders_form
    const { data: insertResult, error } = await supabase
      .from("tbl_article")
      .insert([
        {
          article_nominal: article_nominal || null,
          article_min: article_min || null,
          article_max: article_max || null,
          number_control: number_control || null,
          user_id: user_id || null,
          is_exist: true, // Always true
        },
      ]);

    // Handle errors
    if (error) {
      console.error("Error inserting data:", error.message);
      return NextResponse.json(
        { error: error.message },
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
