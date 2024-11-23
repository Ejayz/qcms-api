/* eslint-disable react/no-children-prop */
import IndexHeader from "@/components/UI/IndexHeader";
import IndexWithoutHeader from "@/components/UI/IndexWithoutHeader";
import LoginView from "@/components/VIEW/LoginView";
import Navigation from "@/components/UI/Navigation";
import SideBar from "@/components/UI/SideBar";

export default function Home() {
  return (
    
    <div  style={{
      backgroundImage: "url('/Img/4.png')",
      
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <Navigation>

    </Navigation><SideBar children={undefined}>
        
      </SideBar>
      </div>
  );
}
  