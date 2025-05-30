import { createClient, roleExtractor } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // Extract UUID from the request query
    const id = req.nextUrl.searchParams.get("id");
   

    // Parse request body
    const { is_exist } =
      await req.json();

    // Initialize Supabase client
    const supabase = await createClient();

    // Verify user role
    // const current_role = await roleExtractor(supabase);
    // if (current_role !== "Super Admin") {
    //   return NextResponse.json(
    //     { error: "No permission to perform this action" },
    //     { status: 401 }
    //   );
    // }

    // Update user details in the database
    const { data: userUpdateData, error: userUpdateError } = await supabase
      .from("tbl_proofing")
      .update({ is_exist, updated_at: new Date() }).eq("id", id);

    if (userUpdateError) {
      console.error("Supabase Update Error:", userUpdateError);
      return NextResponse.json(
        { error: `Database update failed: ${userUpdateError.message}` },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "User updated successfully", data: userUpdateData },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: err.message },
      { status: 500 }
    );
  }
}
