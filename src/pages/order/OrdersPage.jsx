import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { orders } = useSelector((state) => state.order);
  return (
    <Container>
      <Row>
        <Col xs={9}>
          <Form.Control type="text" placeholder="Search by title..." />
        </Col>

        <Col xs={3}>
          <Link to="/admin/new-order">
            <Button variant="success" className="btn-md w-100">
              Create
            </Button>
          </Link>
        </Col>
      </Row>

      <Stack direction="vertical" gap={2} className="mt-2">
        {orders.map((order, index) => (
          <CategoryCard key={index} order={order} />
        ))}
      </Stack>
    </Container>
  );
};

export default OrdersPage;
