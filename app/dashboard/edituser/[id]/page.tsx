import EditUserList from "@/components/VIEW/EditUserList";
import React from "react";

export default function EditUser({ params }: { params:any }) {
  return <EditUserList params={params.id}  ></EditUserList>;
export default async function EditUser({ params }: { params: any }) {
  const {id} = await params;
  return <EditUserList params={id}></EditUserList>;
}
