import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CustomInput from "../CustomInput/customInput";
import { useSelector } from "react-redux";

const CreateOrderModal = ({ show, handleClose, handleSave }) => {
  const { categories } = useSelector((state) => state.category);
  const { users } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order); // Access orders from state

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Find the next order ID based on existing orders
  const getNextOrderId = () => {
    const lastOrderId = orders.reduce((max, order) => {
      const currentId = parseInt(order.orderId.replace("ORD", ""), 10);
      return currentId > max ? currentId : max;
    }, 0);
    return `ORD${(lastOrderId + 1).toString().padStart(3, "0")}`;
  };

  const [formData, setFormData] = useState({
    orderId: getNextOrderId(),
    productName: "",
    userId: "",
    address: "",
    date: today,
    price: "",
    quantity: 1,
    status: "pending",
    categories: "",
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availableQuantity, setAvailableQuantity] = useState(0); // Track available quantity of selected product

  useEffect(() => {
    // Filter products based on selected category
    if (formData.categories) {
      const filtered = products.filter(
        (product) => product.parentCategory === formData.categories
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [formData.categories, products]);

  useEffect(() => {
    // Set price and available quantity based on selected product
    if (formData.productName) {
      const selectedProduct = products.find(
        (product) => product.name === formData.productName
      );
      if (selectedProduct) {
        setFormData((prevState) => ({
          ...prevState,
          price: selectedProduct.price,
        }));
        setAvailableQuantity(selectedProduct.quantity); // Update available quantity
      }
    }
  }, [formData.productName, products]);

  useEffect(() => {
    // Calculate total price
    if (formData.price && formData.quantity) {
      const totalPrice = formData.price * formData.quantity;
      setFormData((prevState) => ({
        ...prevState,
        totalPrice: totalPrice.toFixed(2), // Format to 2 decimal places
      }));
    }
  }, [formData.price, formData.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      const numericValue = Math.min(Number(value), availableQuantity); // Limit to available quantity
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    resetForm();
    handleClose();
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setFormData({
      orderId: getNextOrderId(),
      productName: "",
      userId: "",
      address: "",
      date: today,
      price: "",
      quantity: 1,
      status: "pending",
      categories: "",
    });
    setFilteredProducts([]);
  };

  const isUserSelected = formData.userId !== "";

  return (
    <Modal show={show} onHide={handleModalClose} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <CustomInput
                label="Order ID"
                inputAttributes={{
                  type: "text",
                  placeholder: "Order ID will be auto-generated",
                  name: "orderId",
                  value: formData.orderId,
                  readOnly: true, // Make Order ID read-only
                }}
                handleOnChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                label="User"
                inputAttributes={{
                  type: "select",
                  name: "userId",
                  value: formData.userId,
                  placeholder: "Select user",
                }}
                handleOnChange={handleChange}
                options={users.map((user) => ({
                  value: user._id,
                  label: `${user.firstName} ${user.lastName}`,
                }))}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                label="Categories"
                inputAttributes={{
                  type: "select",
                  name: "categories",
                  value: formData.categories,
                  placeholder: "Select category",
                  disabled: !isUserSelected,
                }}
                handleOnChange={handleChange}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.title,
                }))}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                label="Product Name"
                inputAttributes={{
                  type: "select",
                  name: "productName",
                  value: formData.productName,
                  placeholder:
                    filteredProducts.length === 0
                      ? "No products available"
                      : "Select product",
                  disabled: !isUserSelected || filteredProducts.length === 0,
                }}
                handleOnChange={handleChange}
                options={
                  filteredProducts.length > 0
                    ? filteredProducts.map((product) => ({
                        value: product.name,
                        label: product.name,
                      }))
                    : [{ value: "", label: "No products available" }]
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                label="Address"
                inputAttributes={{
                  type: "text",
                  placeholder: "Enter address",
                  name: "address",
                  value: formData.address,
                  disabled: !isUserSelected,
                }}
                handleOnChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                label="Date"
                inputAttributes={{
                  type: "date",
                  placeholder: "Enter date",
                  name: "date",
                  value: formData.date,
                  disabled: true,
                }}
                handleOnChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                label="Price ($)"
                inputAttributes={{
                  type: "number",
                  placeholder: "Enter price",
                  name: "price",
                  value: formData.price,
                  disabled: !isUserSelected,
                }}
                handleOnChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                label="Quantity"
                inputAttributes={{
                  type: "number",
                  placeholder: "Enter quantity",
                  name: "quantity",
                  value: formData.quantity,
                  min: 1,
                  max: availableQuantity, // Set max based on available quantity
                  disabled: !isUserSelected,
                }}
                handleOnChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mt-3 justify-content-end">
            <Col md="auto">
              <Button variant="primary" type="submit">
                Create Order
              </Button>
            </Col>
            <Col md="auto">
              <Button variant="danger" onClick={handleModalClose}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrderModal;
