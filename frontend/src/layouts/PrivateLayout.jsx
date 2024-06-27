import { Outlet } from "react-router";
import Header from "../components/DashboardHeader";
import Sidebar from "../components/Sidebar";


export default function (){
    return (<>
        <Header/>
        <Sidebar/>
        <Outlet/>
    </>
    )
}