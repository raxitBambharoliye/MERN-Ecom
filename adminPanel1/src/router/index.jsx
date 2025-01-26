import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "../components/Root/Root";
import Private from "../components/Private/Private";
import { AddCategory, ViewAdmin, ViewCategory ,AddUser,ViewUser,Profile,Login,AddAdmin,Dashboard, AddProduct, ViewProduct} from "../pages";
import { APP_URL } from "../constant";


const privateRoute = [
    {path:"",element:<Dashboard />},
    {path:APP_URL.RE_ADD_ADMIN_PAGE, element:<AddAdmin />}, 
    {path:APP_URL.RE_VIEW_ADMIN_PAGE, element:<ViewAdmin />}, 
    {path:APP_URL.RE_PROFILE, element:<Profile />}, 

    {path:APP_URL.RE_ADD_CATEGORY_PAGE, element:<AddCategory />}, 
    {path:APP_URL.RE_VIEW_CATEGORY_PAGE, element:<ViewCategory />}, 
    
    {path:APP_URL.RE_VIEW_USER_PAGE, element:<ViewUser />}, 
    {path:APP_URL.RE_ADD_USER_PAGE, element:<AddUser />}, 

    {path:APP_URL.RE_ADD_PRODUCT_PAGE,element:<AddProduct />}, 
    {path:APP_URL.RE_VIEW_PRODUCT_PAGE,element:<ViewProduct />}, 
]

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />} />
            <Route path="" element={<Private/>}>
                <Route path="/" element={<Root />}>
                    {privateRoute.map((el,index) => (
                    <Route key={index} path={el.path} element={el.element} />
                    ))}
                </Route>
            </Route>
        </Route>
    )
)
export default router;