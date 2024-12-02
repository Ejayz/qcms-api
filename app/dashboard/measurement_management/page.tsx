"use client";
import MeasurementListView from "@/components/VIEW/MeasurementListView";
import SideBar from "@/components/UI/SideBar";

export default function Home() {
  return (
    <><SideBar>
      <MeasurementListView></MeasurementListView>
    </SideBar></>
  );
}
