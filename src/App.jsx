import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/authPage/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmailPage from "./pages/authPage/VerifyEmailPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
