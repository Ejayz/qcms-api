"use client";
import EditArticleList from "@/components/VIEW/EditArticleList";

export default function EditUser({params}: {params:any}) {
  return <EditArticleList params={params.id}></EditArticleList>;
}
