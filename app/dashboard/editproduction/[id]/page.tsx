// import IndexHeader from "@/components/UI/IndexHeader";
// import IndexWithoutHeader from "@/components/UI/IndexWithoutHeader";
// import AddUserView from "@/components/VIEW/AddUserView";
// import LoginView from "@/components/VIEW/LoginView";
// import UserListView from "@/components/VIEW/UserListView";
// import Navigation from "@/components/UI/Navigation";
// import SideBar from "@/components/UI/SideBar";
"use client";
import EditProductionList from "@/components/VIEW/EditProductionList";
export default function EditProduction({params}: {params:any}) {
  return (
    <EditProductionList params={params.id}></EditProductionList>
  );
}

