import EditUserList from "@/components/VIEW/EditUserList";

export default function EditUser({ params }: { params:any }) {
  return <EditUserList params={params.id}  ></EditUserList>;
}
