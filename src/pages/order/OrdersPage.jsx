import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrdersTable from "../../components/OrdersTable/OrdersTable";

const OrdersPage = () => {
  return (
    <Container>
      <Row>
        <Col xs={9}>
          <Form.Control type="text" placeholder="Search by Order number...." />
        </Col>

        <Col xs={3}>
          <Link to="/admin/new-order">
            <Button variant="success" className="btn-md w-100">
              Create New Order
            </Button>
          </Link>
        </Col>
      </Row>

      <Stack direction="vertical" gap={2} className="mt-2">
        <OrdersTable />
      </Stack>
    </Container>
  );
};

export default OrdersPage;
