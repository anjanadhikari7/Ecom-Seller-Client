import { useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUserAction } from "../../redux/user/userActions";

const UserPage = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch action to get all users
    dispatch(getAllUserAction());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={8}>
            <Stack gap={4}>
              <Form.Control type="text" placeholder="Search by title..." />

              {users.map((user, index) => (
                <p>{user.firstName}</p>
              ))}
            </Stack>
          </Col>

          <Col xs={4} className="text-end">
            <Link to="/admin/new-user">
              <Button variant="success" className="btn-md">
                Create
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserPage;
