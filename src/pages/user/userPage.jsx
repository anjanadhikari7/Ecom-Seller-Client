import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUserAction } from "../../redux/user/userActions";
import UserTable from "../../components/userTable/UserTable";

const UserPage = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mb-4">
        <Col xs={8}>
          <Stack direction="horizontal" gap={2}>
            <Form.Control
              type="text"
              placeholder="Search by Name..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Stack>
        </Col>

        <Col xs={4}>
          <Link to="/signup">
            <Button variant="success" className="btn-md">
              Add New User
            </Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <UserTable users={filteredUsers} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
