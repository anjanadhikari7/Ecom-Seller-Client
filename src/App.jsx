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
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="new-category" element={<NewCategoryPage />} />
          <Route path="edit-category/:id" element={<EditCategoryPage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
