import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/authPage/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
