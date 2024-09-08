import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserAccountPage = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <div>Loading...</div>; // Handle the case where user data is not available
  }

  const { firstName, lastName, email, role, address, createdAt, updatedAt } =
    user;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header as="h4" className="bg-tertiary ">
              User Details
            </Card.Header>
            <Card.Body>
              <Card.Title className="mb-3">
                <span className="fw-bold">Name:</span>{" "}
                {`${firstName} ${lastName}`}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <span className="fw-bold">Email:</span> {email}
              </Card.Subtitle>
              <Card.Text className="mb-2">
                <span className="fw-bold">Role:</span>{" "}
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Card.Text>
              <Card.Text className="mb-2">
                <span className="fw-bold">Address:</span>{" "}
                {address || "Not Provided"}
              </Card.Text>
              <Card.Text className="mb-2">
                <span className="fw-bold">Account Created:</span>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </Card.Text>
              <Card.Text className="mb-3">
                <span className="fw-bold">Last Updated:</span>{" "}
                {new Date(updatedAt).toLocaleDateString()}
              </Card.Text>
              <Link to={`/admin/edit-user/${user._id}`}>
                <Button variant="info" className="w-100">
                  Edit User
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserAccountPage;
