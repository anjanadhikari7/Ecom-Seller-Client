import { Button, Spinner, Stack, Table } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { deleteUserAction } from "../../redux/user/userActions";

const UserTable = (props) => {
  const { users } = props;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const handleOndelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.firstName}?`)) {
      dispatch(deleteUserAction(user));
    }
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Verified</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.isVerified ? "Yes" : "No"}</td>
              <td>{user.role}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Link to={`/admin/edit-user/${user._id}`}>
                    <Button variant="outline-success">
                      <BsPencil />
                    </Button>
                  </Link>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleOndelete(user)}
                  >
                    {isLoading ? (
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      <BsTrash />
                    )}
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
