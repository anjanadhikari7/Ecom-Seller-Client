import { Button, Form, Spinner, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { updateUserAction } from "../../redux/user/userActions";

const USER_FORM_FIELDS = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email address", name: "email", type: "email" },
  { label: "Phone Number", name: "phone", type: "text" },
  { label: "Address", name: "address", type: "text" },
];

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const EditUserForm = ({ initialFormData }) => {
  const { formData, handleOnChange } = useForm(initialFormData);
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserAction(formData));
    if (result.success) {
      navigate("/admin/users");
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      {USER_FORM_FIELDS.map((field, index) => (
        <Form.Group key={index} controlId={`form${field.name}`}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleOnChange}
          />
        </Form.Group>
      ))}

      {/* Role Toggle */}
      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <div>
          {ROLE_OPTIONS.map((option) => (
            <Form.Check
              key={option.value}
              type="radio"
              id={`role-${option.value}`}
              name="role"
              value={option.value}
              label={option.label}
              checked={formData.role === option.value}
              onChange={handleOnChange}
            />
          ))}
        </div>
      </Form.Group>

      {/* isVerified Toggle */}
      <Form.Group controlId="formIsVerified" className="mt-3">
        <Form.Check
          type="switch"
          id="isVerified"
          name="isVerified"
          label="Verified"
          checked={formData.isVerified}
          onChange={(e) =>
            handleOnChange({
              target: {
                name: "isVerified",
                value: e.target.checked,
              },
            })
          }
        />
      </Form.Group>

      <Stack direction="horizontal" gap={1} className="p-2 mt-3">
        <Button variant="outline-success" className="me-auto" type="submit">
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            "Update"
          )}
        </Button>
        <Link to="/admin/users" className="w-100">
          <Button variant="outline-danger">Cancel</Button>
        </Link>
      </Stack>
    </Form>
  );
};

export default EditUserForm;
