import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request data
    const data = await req.json();
    const {
      order_id,
      length,
      inside_diameter,
      outside_diameter,
      flat_crush,
      h20,
      radial,
      number_control,
      remarks,
      user_id,
    } = data;

    console.log(
      "Received Data:",
      order_id,
      length,
      inside_diameter,
      outside_diameter,
      flat_crush,
      h20,
      radial,
      number_control,
      remarks,
    );

    // Create Supabase client
    const supabase = await createClient();

    // Insert data into tbl_orders_form
    const { data: insertResult, error } = await supabase
      .from("tbl_measurement")
      .insert([
        {
          order_form_id: order_id || null,
          length: length || null,
          inside_diameter: inside_diameter || null,
          outside_diameter: outside_diameter || null,
          flat_crush: flat_crush || null,
          h20: h20 || null,
          radial: radial || null,
          number_control: number_control || null,
          remarks: remarks || null,
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