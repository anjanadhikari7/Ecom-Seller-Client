import { Button, Stack, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const UserTable = (props) => {
  const { users } = props;
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
                  <Button variant="outline-success">
                    <MdEdit />
                  </Button>
                  <Link to={`/admin/manage-product-images/`}>
                    <Button variant="outline-danger">
                      <FaTrash />
                    </Button>
                  </Link>
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
