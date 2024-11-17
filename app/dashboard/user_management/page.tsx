import IndexHeader from "@/components/UI/IndexHeader";
import IndexWithoutHeader from "@/components/UI/IndexWithoutHeader";
import AddUserView from "@/components/VIEW/AddUserView";
import LoginView from "@/components/VIEW/LoginView";
import UserListView from "@/components/VIEW/UserListView";

export default function Home() {
  return (
    <IndexHeader>
      <UserListView></UserListView>
    </IndexHeader>
  );
}
