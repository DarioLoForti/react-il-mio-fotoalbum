import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Photos from "./pages/Photos";
import PrivateLayout from "./layouts/PrivateLayout";
import Dashboard from "./pages/Dashboard";
import ProtectPage from "./middlewares/ProtectPage";


export default function(){

    return (
      <Routes>
               {/* Public */}
               <Route path="/" element={<DefaultLayout />}>
                    <Route path="*" element={<NotFound/>}/>
                        <Route index element={<Home/>} />
                        <Route path="photos" element={<Photos/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                </Route>

                {/* Private */}
                <Route path="/" element={
                    <ProtectPage>
                    <PrivateLayout />
                    </ProtectPage>
                    }>
                        <Route path="dashboard" element={<Dashboard />} />
                    <Route path="posts">
                            {/* <Route path=":id" element={<SinglePhoto/>}/> */}
                            {/* <Route path=":id/edit" element={<EditPost/>}/> */}
                            {/* <Route path="create" element={<AddPhoto/>}/> */}
                   </Route>
                </Route>

      </Routes>
    )

}