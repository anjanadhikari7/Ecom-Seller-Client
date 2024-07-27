import { Button, Col, Container, Form, Spinner } from "react-bootstrap";
import CustomInput from "../CustomInput/customInput";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserAction } from "../../redux/user/userActions";
import { useNavigate } from "react-router-dom";
const initialFormData = {
  otp: "",
};

const OTPForm = (props) => {
  const { setIsOtpVerified } = props;
  const dispatch = useDispatch();
  const handleOnVerify = (e) => {
    e.preventDefault();
    const result = dispatch(verifyUserAction(formData));

    if (result) {
      setIsOtpVerified(true);
    }
  };
  const { formData, handleOnChange } = useForm(initialFormData);
  const { isLoading } = useSelector((state) => state.user);
  return (
    <Col className="d-flex justify-content-center align-items-center">
      <Container className="p-4 border shadow-lg rounded-4">
        <Form onSubmit={handleOnVerify}>
          <CustomInput
            key={1}
            label={"Enter OTP:"}
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: "number",
              name: "otp",
              value: formData.otp,
              placeholder: "Enter the OTP",
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
              "Verify"
            )}
          </Button>
        </Form>
      </Container>
    </Col>
  );
};

export default OTPForm;
