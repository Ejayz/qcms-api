import EditProductionList from "@/components/VIEW/EditProductionList";
import React from "react";

export default async function EditProduction({ params }: { params: any }) {
  const {id} = await params;
  return <EditProductionList params={id}></EditProductionList>;
}
    