import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Logout, Private, Root } from "../components/";
import { About, ContactUs, Home, Products, Profile, Sale, SingleProduct } from "../pages";
import { APP_URL } from "../components/constant";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={APP_URL.FE_HOME} element={<Root />}>
            <Route path="" element={<Home />}></Route>
            <Route path={APP_URL.FE_ABOUT} element={<About />}></Route>
            <Route path={APP_URL.FE_CONTACT} element={<ContactUs />}></Route>
            <Route path={APP_URL.FE_PRODUCTS} element={<Products />}></Route>
            <Route path="" element={<Private />}>
                <Route path={APP_URL.FE_PROFILE} element={<Profile />}></Route>
            </Route>
            <Route path={APP_URL.FE_SALE} element={<Sale />}></Route>
            <Route path={`${APP_URL.FE_SINGLE_PRODUCT}/:id`} element={<SingleProduct />}></Route>
        </Route>
    )
)

export default router;