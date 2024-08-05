import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import EditUserForm from "../../components/EditUserForm/EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const { users } = useSelector((state) => state.user);
  const user = users?.find((user) => user._id === id);

  const userData = {
    _id: user?._id,
    isVerified: user.isVerified,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
  };

  return (
    <>
      <Alert variant="info" className="text-dark fw-bold fs-4">
        Edit User
      </Alert>

      <EditUserForm initialFormData={userData} />
    </>
  );
};

export default EditUser;
