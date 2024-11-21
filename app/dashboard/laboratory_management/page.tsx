import IndexHeader from "@/components/UI/IndexHeader";
import IndexWithoutHeader from "@/components/UI/IndexWithoutHeader";
import AddUserView from "@/components/VIEW/AddUserView";
import LoginView from "@/components/VIEW/LoginView";
import UserListView from "@/components/VIEW/UserListView";
import Navigation from "@/components/UI/Navigation";
import SideBar from "@/components/UI/SideBar";
import LaboratoryListView from "@/components/VIEW/LaboratoryListView";

export default function Order() {
  return (
    <><Navigation></Navigation><SideBar>
        <LaboratoryListView></LaboratoryListView>
    </SideBar></>
  );
}

