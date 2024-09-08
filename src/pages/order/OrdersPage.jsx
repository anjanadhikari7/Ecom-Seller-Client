import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import CreateOrderModal from "../../components/CreateOrderModal/CreateOrderModal";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAction } from "../../redux/order/orderAction";
import { updateProductAction } from "../../redux/product/productActions";

const OrdersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveOrder = (newOrder) => {
    // Dispatch action to create the new order
    dispatch(createOrderAction(newOrder));

    // Update product quantities
    newOrder.products.forEach((orderProduct) => {
      // Find the product to update
      const productToUpdate = products.find(
        (product) => product._id === orderProduct.productId
      );

      if (productToUpdate) {
        // Create the updated product object
        const updatedProduct = {
          ...productToUpdate,
          quantity: productToUpdate.quantity - orderProduct.quantity,
        };

        // Dispatch action to update the product quantity
        dispatch(updateProductAction(updatedProduct));
      }
    });

    console.log(newOrder);
  };

  return (
    <Container>
      <Row className="align-items-center mb-3">
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
