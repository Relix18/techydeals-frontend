import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import NotFound from "./components/NotFound";
import { HideComponents, HideFooter } from "./components/utils/HideComponent";
import Loader from "./components/utils/Loader";
import { Toaster } from "react-hot-toast";
import { useGetUserQuery, useLogoutUserMutation } from "./redux/api/user";
import { useDispatch } from "react-redux";
import { loggedIn } from "./redux/reducer/auth";
import AdminProtected from "./components/utils/AdminProtected";
import Protected from "./components/utils/Protected";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Checkout = lazy(() => import("./components/Checkout"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Login = lazy(() => import("./components/Auth/Login"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const Verification = lazy(() => import("./components/Auth/Verification"));
const ForgetPassword = lazy(() => import("./components/Auth/ForgetPassword"));
const Products = lazy(() => import("./components/Products"));
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));
const ChangePassword = lazy(() => import("./components/Auth/ChangePassword"));
const MyAccount = lazy(() => import("./components/user/MyAccount"));
const EditProfile = lazy(() => import("./components/user/EditProfile"));
const EditEmail = lazy(() => import("./components/user/EditEmail"));
const EditName = lazy(() => import("./components/user/EditName"));
const MyAddress = lazy(() => import("./components/user/MyAddress"));
const MyOrder = lazy(() => import("./components/user/MyOrder"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const AdminProductList = lazy(() => import("./components/Admin/ProductList"));
const EditProduct = lazy(() => import("./components/Admin/EditProduct"));
const CreateProduct = lazy(() => import("./components/Admin/Create"));
const CreateCategory = lazy(() => import("./components/Admin/Category"));
const Orders = lazy(() => import("./components/Admin/Orders"));
const OrderUpdate = lazy(() => import("./components/Admin/OrderUpdate"));
const UserList = lazy(() => import("./components/Admin/UserList"));
const UserUpdate = lazy(() => import("./components/Admin/UserRole"));
const Reviews = lazy(() => import("./components/Admin/Reviews"));
const OrderSuccess = lazy(() => import("./components/Success"));
const OrderDetails = lazy(() => import("./components/user/OrderDetails"));

function App() {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useGetUserQuery();
  const [userLogout] = useLogoutUserMutation();

  useEffect(() => {
    if (user) {
      if (user.user.verified) {
        dispatch(loggedIn(user.user));
      } else {
        userLogout();
      }
    }
  }, [dispatch, user, userLogout]);

  return (
    <>
      {!isLoading && (
        <Router>
          <Toaster />
          <HideComponents>
            <Navbar />
          </HideComponents>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/checkout"
                element={
                  <Protected>
                    <Checkout />
                  </Protected>
                }
              />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/users/:id/verify/:token"
                element={<Verification />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/change-password"
                element={
                  <Protected>
                    <ChangePassword />
                  </Protected>
                }
              />
              <Route
                path="/account"
                element={
                  <Protected>
                    <MyAccount />
                  </Protected>
                }
              />
              <Route
                path="/account/edit"
                element={
                  <Protected>
                    <EditProfile />
                  </Protected>
                }
              />
              <Route
                path="/account/edit/email"
                element={
                  <Protected>
                    <EditEmail />
                  </Protected>
                }
              />
              <Route
                path="/account/edit/name"
                element={
                  <Protected>
                    <EditName />
                  </Protected>
                }
              />
              <Route
                path="/account/address"
                element={
                  <Protected>
                    <MyAddress />
                  </Protected>
                }
              />
              <Route
                path="/orders"
                element={
                  <Protected>
                    <MyOrder />
                  </Protected>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <Protected>
                    <OrderDetails />
                  </Protected>
                }
              />

              {/* Admin */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtected>
                    <Dashboard />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminProtected>
                    <AdminProductList />
                  </AdminProtected>
                }
              />
              <Route
                path="/product/edit/:id"
                element={
                  <AdminProtected>
                    <EditProduct />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/product/new"
                element={
                  <AdminProtected>
                    <CreateProduct />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/product/new/category"
                element={
                  <AdminProtected>
                    <CreateCategory />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminProtected>
                    <Orders />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/order/:id"
                element={
                  <AdminProtected>
                    <OrderUpdate />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminProtected>
                    <UserList />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <AdminProtected>
                    <UserUpdate />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/reviews"
                element={
                  <AdminProtected>
                    <Reviews />
                  </AdminProtected>
                }
              />
              <Route path="/success/:id" element={<OrderSuccess />} />
              <Route
                path="*"
                element={
                  <AdminProtected>
                    <NotFound />
                  </AdminProtected>
                }
              />
            </Routes>
          </Suspense>
          <HideFooter>
            <HideComponents>
              <Footer />
            </HideComponents>
          </HideFooter>
        </Router>
      )}
    </>
  );
}

export default App;
