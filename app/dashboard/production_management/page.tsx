import IndexHeader from "@/components/UI/IndexHeader";
import IndexWithoutHeader from "@/components/UI/IndexWithoutHeader";
import AddUserView from "@/components/VIEW/AddUserView";
import LoginView from "@/components/VIEW/LoginView";
import UserListView from "@/components/VIEW/UserListView";
import Navigation from "@/components/UI/Navigation";
import SideBar from "@/components/UI/SideBar";
import OrderListView from "@/components/VIEW/OrderListView";
import ProductionListView from "@/components/VIEW/ProductionListView";

export default function Production() {
  return (
    <><Navigation></Navigation><SideBar>
        <ProductionListView></ProductionListView>
    </SideBar></>
  );
}

