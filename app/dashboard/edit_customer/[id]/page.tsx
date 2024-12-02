"use client";
import EditCustomerList from "@/components/VIEW/EditCustomerList";

export default function EditCustomer({params}: {params:any}) {
  return <EditCustomerList params={params.id}></EditCustomerList>;
}
