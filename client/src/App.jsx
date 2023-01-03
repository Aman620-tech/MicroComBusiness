import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/UserAuth/Login/Login';
import Register from './pages/UserAuth/Register/Register';
import Header from './Header/Header';
import Dashboard from './pages/dashboard/Dashboard';
import { AdminProtected, BusinessProtected, UserProtected } from './Auth';
import ForgetPassword from './pages/UserAuth/ForgetPassword/ForgetPassword';
import AboutUs from './pages/dashboard/aboutUs/AboutUs';
import Feedback from './pages/Feedback/Feedback';
import Developers from './pages/dashboard/developer/Developers';
import AdminHome from './pages/admin/Home/AdminHome';
import AdminCategory from './pages/admin/Category/AdminCategory';
import AdminSubCategory from './pages/admin/SubCategory/AdminSubCategory';
import AdminFeedback from './pages/admin/Feedback/AdminFeedback';
import AdminOffer from './pages/admin/Offer/AdminOffer';
import AdminOwner from './pages/admin/Owner/AdminOwner';
import User from './pages/admin/User/User';
import AdminShop from './pages/admin/Shop/AdminShop';
import AdminDelivery from './pages/admin/Delivery/Delivery';
import Error from './Error';
// 
import Cart from './pages/dashboard/cart/Cart';

import BusinessDashboard from './pages/business/Businessdashboard/BusinessDashboard';
import BusinessRegister from './pages/business/businessRegister/BusinessRegister';
import Profile from './component/Profile/Profile';
import ProductView from './pages/dashboard/Product/ProductView';
import BusinessHome from './pages/business/Home/BusinessHome';
import BusinessProducts from './pages/business/product/BusinessProducts';
// import BusinessUpdate from './pages/business/BusinessUpdate/BusinessUpdate';
import AdminVerification from './pages/admin/verification/AdminVerification';
import Verification from './pages/business/verification/Verification';
import ResetPassword from './pages/UserAuth/ResetPassword/ResetPassword';
import AddProduct from './pages/business/product/Add/AddProduct';
import AccountSetting from './pages/business/AccountSetting/AccountSetting';
import Footer from './Footer/Footer';
import Home from './pages/dashboard/Home/Home';
import UpdateProfile from './component/Profile/Update/UpdateProfile';
import UserVerification from './pages/dashboard/verification/UserVerification';
import SingleProductView from './component/Product/view/SingleProductView';
import DocumentView from './pages/admin/verification/view/DocumentView';
import Success from './component/Payment/Success';
import Failure from './component/Payment/Failure';
import Payment from './pages/dashboard/UserPayments/Payment';

import DocumentVerify from './pages/dashboard/verification/Document/DocumentVerify';
import BusinessPayment from './pages/business/payment/BusinessPayment';
import SubCategories from './pages/admin/Category/SubCategories';
// import Sidebar from './pages/business/SideBar/SideBar';
function App() {
  let role = localStorage.getItem("role")
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token")
  // const [tokenData,setTokenData] = useState(token)

  // console.log("token", token)
  // useEffect(()=>{
  //   setTokenData(token)
  // },[tokenData])
  return (
    <div>
      <Header />
      <div className="App">
        {/* <header className="App-header"> */}
        <Routes>
          {/* {(() => {
            switch (role) {
              case 'admin':
                return <Route path={"/admin/dashboard/home"} element={<AdminProtected cmp={AdminHome} />} />

              case 'business':
                return <Route path={"/business/dashboard"} element={<BusinessProtected cmp={BusinessDashboard} />} />


              default:
                return <Route path="/" element={< Home />} />

            }
          })()} */}

          <Route path="/*" element={<Error />} />
          <Route path={"/admin/dashboard/home"} element={<AdminProtected cmp={AdminHome} />} />
          <Route path={"/business/dashboard"} element={<BusinessProtected cmp={BusinessHome} />} />

          <Route path="/login" element={<Login />} />

          <Route path="/" element={< Home />} />


          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/developer" element={<Developers />} />
          <Route path="/products" element={<ProductView />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path={"/profile"} element={<UserProtected cmp={Profile} />} />
          <Route path={"/verification/:userId"} element={<UserProtected cmp={UserVerification} />} />
          <Route path={"/verification/document/:userId"} element={<UserProtected cmp={DocumentVerify} />} />
          <Route path={"/profile/:userId"} element={<UpdateProfile />} />
          <Route path={"/verification"} element={<UserProtected cmp={UserVerification} />} />
          <Route path={"/payments/:userId"} element={<UserProtected cmp={Payment} />} />
          <Route path="/products/:categoryId/:productId" element={<UserProtected cmp={SingleProductView} />} />
          <Route path="/products/:productId" element={<UserProtected cmp={SingleProductView} />} />
          <Route path={"/category/product/:categoryId"} element={<UserProtected cmp={ProductView} />} />

          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />

          {/* <Route path={"/admin/dashboard/home"} element={<AdminProtected cmp={AdminHome} />} /> */}
          <Route path={"/admin/dashboard/category"} element={<AdminProtected cmp={AdminCategory} />} />
          <Route path={"/admin/dashboard/category/:categoryId"} element={<AdminProtected cmp={SubCategories} />} />
          <Route path={"/admin/dashboard/sub-category"} element={<AdminProtected cmp={AdminSubCategory} />} />
          <Route path={"/admin/dashboard/feedback"} element={<AdminProtected cmp={AdminFeedback} />} />
          <Route path={"/admin/dashboard/offer"} element={<AdminProtected cmp={AdminOffer} />} />
          <Route path={"/admin/dashboard/owner"} element={<AdminProtected cmp={AdminOwner} />} />
          <Route path={"/admin/dashboard/verification"} element={<AdminProtected cmp={AdminVerification} />} />
          <Route path={"/admin/dashboard/verification/:businessId"} element={<AdminProtected cmp={DocumentView} />} />
          <Route path={"/admin/dashboard/profile"} element={<AdminProtected cmp={Profile} />} />
          <Route path={"/admin/dashboard/user"} element={<AdminProtected cmp={User} />} />
          <Route path={"/admin/dashboard/shop"} element={<AdminProtected cmp={AdminShop} />} />
          <Route path={"/admin/dashboard/delivery"} element={<AdminProtected cmp={AdminDelivery} />} />

          <Route path="/business/register" element={<BusinessRegister />} />
          {/* <Route path={"/business/register"} element={<BusinessProtected cmp={BusinessRegister} />} /> */}
          <Route path={"/business/dashboard"} element={<BusinessProtected cmp={BusinessHome} />} />
          <Route path={"/business/dashboard/home"} element={<BusinessProtected cmp={BusinessHome} />} />
          <Route path={"/business/dashboard/employee"} element={<BusinessProtected cmp={Error} />} />
          <Route path={"/business/dashboard/products"} element={<BusinessProtected cmp={BusinessProducts} />} />
          <Route path={"/business/dashboard/payment"} element={<BusinessProtected cmp={BusinessPayment} />} />
          <Route path={"/business/dashboard/products/add"} element={<BusinessProtected cmp={AddProduct} />} />
          <Route path={"/business/dashboard/product/:productId"} element={<BusinessProtected cmp={BusinessDashboard} />} />
          <Route path={"/business/dashboard/profile/:userId"} element={<BusinessProtected cmp={UserVerification} />} />
          <Route path={"/business/dashboard/profile"} element={<BusinessProtected cmp={Profile} />} />
          {/* <Route path={"business/verification/:userId"} element={<BusinessProtected cmp={UserVerification} />} /> */}
          <Route path={"/business/dashboard/account-setting"} element={<BusinessProtected cmp={AccountSetting} />} />
          <Route path={"/business/dashboard/profile"} element={<BusinessProtected cmp={Profile} />} />
          <Route path={"/business/verification/document/:userId"} element={<BusinessProtected cmp={DocumentVerify} />} />
          {/* <Route path={"/business/dashboard/business-update"} element={<BusinessProtected cmp={BusinessUpdate} />} /> */}
          <Route path={"/business/dashboard/verification"} element={<BusinessProtected cmp={Verification} />} />


        </Routes>

      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;