import { Button, Col, Container, Form, Spinner } from "react-bootstrap";
import CustomInput from "../CustomInput/customInput";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/user/userSlice";
import { otpAction } from "../../redux/user/userActions";
const initialFormData = {
  email: "",
};

const EmailForm = (props) => {
  const { setIsEmailSent } = props;
  const dispatch = useDispatch();

  const { formData, handleOnChange } = useForm(initialFormData);
  const { isLoading } = useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(setIsLoading(false));
    dispatch(otpAction(formData))
      .then(() => {
        dispatch(setIsLoading(false));
        setIsEmailSent(true);
      }) // Update state when email is sent
      .catch((error) => console.error("Failed to send OTP", error)); // Handle any errors
  };
  return (
    <Col className="d-flex justify-content-center align-items-center">
      <Container className="p-4 border shadow-lg rounded-4">
        <Form onSubmit={handleOnSubmit}>
          <CustomInput
            key={1}
            label={"Enter your registered email:"}
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "email",
              name: "email",
              value: formData.email,
              placeholder: "Enter your Email address",
              required: true,
            }}
          />
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
    </Col>
  );
};

export default EmailForm;
