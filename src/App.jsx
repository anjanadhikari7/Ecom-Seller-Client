import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/authPage/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmailPage from "./pages/authPage/VerifyEmailPage";
import LoginPage from "./pages/authPage/LoginPage";
import AdminLayout from "./components/adminLayout/adminLayout";
import AdminPrivateRoutes from "./components/PrivateAdminRoute/PrivateAdminRoute";
import CategoriesPage from "./pages/category/CategoriesPage";
import NewCategoryPage from "./pages/category/NewCategoryPage";
import ResetEmailPage from "./pages/authPage/ResetEmailPage";
import EditCategoryPage from "./pages/category/EditCategoryPage";
import ProductPage from "./pages/product/ProductsPage";
import NewProductPage from "./pages/product/NewProductPage";
import EditProductPage from "./pages/product/EditProductPage";
import ManageProductImages from "./pages/product/ManageProductImages";
import UserPage from "./pages/user/userPage";
import OrdersPage from "./pages/order/OrdersPage";
import EditUser from "./pages/user/EditUser";
import Dashboard from "./pages/dashboard/dashboardPage";
import UserAccountPage from "./pages/user/UserAccountPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetEmailPage />} />

        {/* Private Routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoutes>
              <AdminLayout />
            </AdminPrivateRoutes>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="new-category" element={<NewCategoryPage />} />
          <Route path="edit-category/:id" element={<EditCategoryPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="new-product" element={<NewProductPage />} />
          <Route path="edit-product/:id" element={<EditProductPage />} />
          <Route
            path="manage-product-images/:id"
            element={<ManageProductImages />}
          />
          <Route path="users" element={<UserPage />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="account" element={<UserAccountPage />} />
          <Route path="edit-order/:id" element={"<EditOrderPage />"} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
