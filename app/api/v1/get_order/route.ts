import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") || "0";
  const limit = req.nextUrl.searchParams.get("limit") || "10";
  const search = req.nextUrl.searchParams.get("search");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

  const supabase = await createClient();

  let data = null;
  let error = null;

  // First query: Search in product_name
  let query = supabase
    .from("tbl_orders_form")
    .select(
      `
      *,
      tbl_customer!inner (
        first_name,
        last_name,
        middle_name
      ),
      tbl_article!inner (
        article_name
      )
    `
    )
    .eq("is_exist", true)
    .or(`product_name.ilike.%${search}%`)
    .range(
      (parseInt(page) - 1) * parseInt(limit),
      parseInt(page) * parseInt(limit) - 1
    );

  // Add date filters
  if (startDate) {
    query = query.gte("created_at", startDate);
  }
  if (endDate) {
    query = query.lte("created_at", endDate);
  }
  
  const { data: productData, error: productError } = await query;

  if (productError) {
    error = productError;
  }

  // If no product data found, search in tbl_customer
  if (!productData || productData.length === 0) {
    query = supabase
      .from("tbl_orders_form")
      .select(
        `
        *,
        tbl_customer!inner (
          first_name,
          last_name,
          middle_name
        ),
        tbl_article!inner (
          article_name
        )
      `
      )
      .filter("tbl_customer.first_name", "ilike", `%${search}%`)
      .eq("is_exist", true)
      .not("product_name", "is", null)
      .range(
        (parseInt(page) - 1) * parseInt(limit),
        parseInt(page) * parseInt(limit) - 1
      );

      
    // Add date filters
    if (startDate) {
      query = query.gte("created_at", startDate);
    }
    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    const { data: customerData, error: customerError } = await query;

    if (customerError) {
      error = customerError;
    } else {
      data = customerData;
    }
  }else// If no product data found, search in tbl_customer
  if (!productData || productData.length === 0) {
    query = supabase
      .from("tbl_orders_form")
      .select(
        `
        *,
        tbl_customer!inner (
          first_name,
          last_name,
          middle_name
        ),
        tbl_article!inner (
          article_name
        )
      `
      )
      .filter("tbl_article.article_name", "ilike", `%${search}%`).eq("is_exist", true)
      .range(
        (parseInt(page) - 1) * parseInt(limit),
        parseInt(page) * parseInt(limit) - 1
      );

      
    // Add date filters
    if (startDate) {
      query = query.gte("created_at", startDate);
    }
    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    const { data: customerData, error: customerError } = await query;

    if (customerError) {
      error = customerError;
    } else {
      data = customerData;
    }
  } 
  
  
  else {
    data = productData;
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || [], { status: 200 });
}
