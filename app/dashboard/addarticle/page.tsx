// import IndexHeader from "@/components/UI/IndexHeader";
// import IndexWithoutHeader from "@/components/UI/IndexWithoutHeader";
// import AddUserView from "@/components/VIEW/AddUserView";
// import LoginView from "@/components/VIEW/LoginView";
// import UserListView from "@/components/VIEW/UserListView";
// import Navigation from "@/components/UI/Navigation";
// import SideBar from "@/components/UI/SideBar";
"use client";
import AddArticleListCopy from "@/components/VIEW/AddArticleList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
export default function AddArticle() {  
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
<Toaster position="top-center" reverseOrder={false} />
    <AddArticleListCopy></AddArticleListCopy>
    </QueryClientProvider>
  );
}

