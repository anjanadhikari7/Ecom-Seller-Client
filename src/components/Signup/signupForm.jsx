import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import CustomInput from "../CustomInput/customInput";
import { signupFormFields } from "./signupFormFields";
import { createUser } from "../../axios/userAxios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/user/userSlice";

const initialFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const formValidation = (formData) => {
  const { password, confirmPassword } = formData;

  return password === confirmPassword;
};
const SignupForm = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { formData, handleOnChange, setFormData } = useForm(initialFormData);
  const { firstName, lastName, email, address, phone, password } = formData;

  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // handle form submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = formValidation(formData);
    if (!isValidPassword) {
      return toast.error("Password and confirm password should match");
    }
    dispatch(setIsLoading(true));
    // call api via axios to create user
    const result = await createUser({
      firstName,
      lastName,
      email,
      address,
      phone,
      password,
    });
    dispatch(setIsLoading(false));
    if (result?.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message || "Cannot create user!");
    }

    setFormData(initialFormData);
    toast.success(result.message || " Email verification link sent.");
  };

  return (
    <Container className="p-4 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <h2 className="text-center mb-4">Create an Account</h2>

        <Row>
          {signupFormFields.map((field, index) => (
            <Col key={index} xs={index === 0 || index === 1 ? 6 : 12}>
              <CustomInput
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
            </Col>
          ))}
        </Row>

        <Button
          variant="primary"
          className="btn-lg w-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" /> : "Signup"}
        </Button>
      </Form>
    </Container>
  );
};

export default SignupForm;
