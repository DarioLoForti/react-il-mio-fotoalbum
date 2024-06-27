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
import ShowPhoto from "./pages/ShowPhoto";
import AddPhoto from "./pages/AddPhoto";
import EditPhoto from "./pages/EditPhoto";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";


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
                    <DefaultLayout />
                    </ProtectPage>
                    }>
                        <Route path="dashboard" element={<Dashboard />} />
                    <Route path="photos">
                            <Route path=":id" element={<ShowPhoto/>}/>
                            <Route path=":id/edit" element={<EditPhoto/>}/>
                   </Route>
                   <Route path="create-photo" element={<AddPhoto/>}/>
                   <Route path="categories">
                            <Route index element={<Categories/>} />
                            <Route path=":id" element={<ShowPhoto/>}/>
                            <Route path=":id/edit" element={<EditPhoto/>}/>
                   </Route>
                    <Route path="create-category" element={<AddCategory/>}/>
                </Route>

      </Routes>
    )

} 