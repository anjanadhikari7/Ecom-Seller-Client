import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import CustomInput from "../CustomInput/customInput";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { loginFormFields } from "./loginFormFields";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoading } from "../../redux/user/userSlice";
import { loginUser } from "../../axios/userAxios";
import { toast } from "react-toastify";
import { autoLoginAction, getUserAction } from "../../redux/user/userActions";
import { useEffect } from "react";

const initialFormData = {
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, handleOnChange } = useForm(initialFormData);
  const { isLoading } = useSelector((state) => state.user);

  // Handle on Submit

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // start Loading
    dispatch(setIsLoading(true));
    // API call to login user | GET tokens

    const result = await loginUser(formData);
    // stop loading

    dispatch(setIsLoading(false));
    if (result?.status === "error") {
      return toast.error(result.message);
    }
    toast.success(result.message);
    // If success, we store the accessJWT and refresh JWT in session storage and local storage respectively
    sessionStorage.setItem("accessJWT", result.data.accessJWT);
    localStorage.setItem("refreshJWT", result.data.refreshJWT);

    // once tokens are stored, dispatch action to get user
    dispatch(getUserAction());
  };
  // Logic to handle what should happen if a user is logged in
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // if user exists [logged in], navigate to admin homepage
    if (user?._id) {
      navigate("/admin");
    }

    // if no tokens, keep them in login page
    if (
      !sessionStorage.getItem("accessJWT") &&
      !localStorage.getItem("refreshJWT")
    ) {
      return;
    }

    // if not try auto login
    if (!user?._id) {
      dispatch(autoLoginAction());
    }
  }, [user?._id, navigate, dispatch]);

  return (
    <Container className="p-4 pb-0 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        {loginFormFields.map((field, index) => (
          <CustomInput
            key={index}
            label={field.label}
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: field.type,
              name: field.name,
              value: formData[field.name],
              placeholder: field.placeholder,
              required: true,
            }}
          />
        ))}

        <Button
          variant="primary"
          className="btn-lg w-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" role="status" /> : "Login"}
        </Button>

        <p className="pt-2">
          Forgot Password? <Link to="reset-password">Reset Password</Link>
          <br />
          New User? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="pt-2"></p>
      </Form>
    </Container>
  );
};

export default LoginForm;
