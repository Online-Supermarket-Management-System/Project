import Home from "../pages/Home/Home"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import CustomerProfile from "../pages/Customerprofile/Customerprofile"
import AdminHomePage from "../pages/adminhome/adminhome"
import AdminLogin from "../pages/admin-login/AdminLogin"
import AdminProfile from "../pages/admin-profile/AdminProfile"
import SuperAdmin from "../pages/super-admin/SuperAdmin"
import PastPurchace from "../pages/past-purchace/PastPurchace"

const routes = {
    data: [
        {
          name: "Home",
          path: "/",
          component: <Home/>,
          type: "main",
        },
        {
            name: "Login",
            path: "/login",
            component: <Login/>,
            type: "",
        },
        {
            name: "Register",
            path: "/register",
            component: <Register/>,
            type: "",
         },
         {
            name: "CustomerProfile",
            path: "/customerprofile",
            component: <CustomerProfile/>,
            type: "",
         },
         {
            name: "adminhome",
            path: "/adminhome",
            component: <AdminHomePage/>,
            type: "",
         },
         {
            name: "adminLogin",
            path: "/adminLogin",
            component: <AdminLogin/>,
            type: "",
         },
         {
            name: "adminProfile",
            path: "/adminProfile",
            component: <AdminProfile/>,
            type: "",
         },
         {
            name: "superAdmin",
            path: "/superAdmin",
            component: <SuperAdmin/>,
            type: "",
         },
         {
            name: "PastPurchase",
            path: "/PastPurchase",
            component: <PastPurchace/>,
            type: "",
         }
    ]
}


export default routes