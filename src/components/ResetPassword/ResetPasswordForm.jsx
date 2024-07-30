import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import CustomInput from "../CustomInput/customInput";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../../redux/user/userSlice";
import { toast } from "react-toastify";
import { resetPasswordFormFields } from "./ResetPasswordFormFields";

import { resetPassword } from "../../axios/userAxios";

const initialFormData = {
  password: "",
};
const formValidation = (formData) => {
  const { password, confirmPassword } = formData;

  return password === confirmPassword;
};
const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, handleOnChange } = useForm(initialFormData);
  const { password } = formData;
  const { isLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);

  // Handle on Submit

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // start Loading
    dispatch(setIsLoading(true));
    const result = await resetPassword(user.email, password);

    if (result?.status === "success") {
      dispatch(setIsLoading(false));
      toast.success(result.message);
      navigate("/");
      return;
    }
    dispatch(setIsLoading(false));
    return toast.error(result.message);
  };

  return (
    <Container className="p-4  border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        {resetPasswordFormFields.map((field, index) => (
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
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordForm;
