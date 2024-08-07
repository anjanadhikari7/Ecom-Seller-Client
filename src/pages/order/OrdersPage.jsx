// OrdersPage.jsx
import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import CreateOrderModal from "../../components/CreateOrderModal/CreateOrderModal";
import { useDispatch } from "react-redux";
import { createOrderAction } from "../../redux/order/orderAction";

const OrdersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveOrder = (newOrder) => {
    // Add logic to save the new order
    dispatch(createOrderAction(newOrder));
    console.log(newOrder);
  };

  return (
    <Container>
      <Row>
        <Col xs={9}>
          <Form.Control type="text" placeholder="Search by Order number..." />
        </Col>
        <Col xs={3}>
          <Button
            variant="success"
            className="btn-md w-100"
            onClick={handleShowModal}
          >
            Create New Order
          </Button>
        </Col>
      </Row>
      <Stack direction="vertical" gap={2} className="mt-2">
        <OrdersTable />
      </Stack>
      <CreateOrderModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveOrder}
      />
    </Container>
  );
};

export default OrdersPage;
