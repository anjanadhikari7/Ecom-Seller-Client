import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/authPage/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmailPage from "./pages/authPage/VerifyEmailPage";
import LoginPage from "./pages/authPage/LoginPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
