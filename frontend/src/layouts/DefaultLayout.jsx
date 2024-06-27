import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

export default function (){

    const {isLoggedIn, user} = useAuth();

    return (<>
        <Header/>
        {isLoggedIn && <Sidebar/>}
        <Outlet/>
        
    </>
    )
}