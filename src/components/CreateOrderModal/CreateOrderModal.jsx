import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CustomInput from "../CustomInput/customInput";
import { useSelector } from "react-redux";

const CreateOrderModal = ({ show, handleClose, handleSave }) => {
  const { categories } = useSelector((state) => state.category);
  const { users } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);

  const today = new Date().toISOString().split("T")[0];

  const getNextOrderId = () => {
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const [formData, setFormData] = useState({
    orderId: getNextOrderId(),
    userId: "",
    address: "",
    date: today,
    status: "pending",
    categories: "",
    products: [],
    totalPrice: 0,
  });

  const [currentProduct, setCurrentProduct] = useState({
    categoryId: "",
    productId: "",
    productName: "",
    price: "",
    quantity: 1,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  useEffect(() => {
    if (currentProduct.categoryId) {
      const filtered = products.filter(
        (product) => product.parentCategory === currentProduct.categoryId
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [currentProduct.categoryId, products]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      setCurrentProduct({
        ...currentProduct,
        categoryId: value,
        productId: "",
      });
      setAvailableQuantity(0);
    } else if (name === "productId") {
      const selectedProduct = products.find((product) => product._id === value);
      if (selectedProduct) {
        setCurrentProduct({
          ...currentProduct,
          productId: selectedProduct._id,
          productName: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
        });
        setAvailableQuantity(selectedProduct.quantity);
      }
    } else if (name === "quantity") {
      setCurrentProduct({
        ...currentProduct,
        quantity: Math.min(Number(value), availableQuantity),
      });
    }
  };

  const handleAddProduct = () => {
    if (currentProduct.productId && currentProduct.quantity > 0) {
      setFormData((prevState) => ({
        ...prevState,
        products: [...prevState.products, { ...currentProduct }],
      }));
      setCurrentProduct({
        categoryId: "",
        productId: "",
        productName: "",
        price: "",
        quantity: 1,
      });
    }
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  useEffect(() => {
    const totalPrice = formData.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setFormData((prevState) => ({
      ...prevState,
      totalPrice: totalPrice.toFixed(2),
    }));
  }, [formData.products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      userId: "",
      address: "",
      date: today,
      status: "pending",
      categories: "",
      products: [],
      totalPrice: 0,
    });
    setCurrentProduct({
      categoryId: "",
      productId: "",
      productName: "",
      price: "",
      quantity: 1,
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
                  readOnly: true,
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
                  label: `${user.firstName} ${user.lastName} (${user.email})`,
                }))}
              />
            </Col>
          </Row>

          {formData.products.length > 0 && (
            <h5 className="mt-4">Selected Products</h5>
          )}
          {formData.products.map((product, index) => (
            <Row key={index} className="mt-2">
              <Col md={6}>{product.productName}</Col>
              <Col md={3}>Quantity: {product.quantity}</Col>
              <Col md={3}>
                <Button variant="danger" onClick={() => removeProduct(index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          <h5 className="mt-4">Add New Product</h5>
          <Row className="mt-2">
            <Col md={6}>
              <CustomInput
                label="Category"
                inputAttributes={{
                  type: "select",
                  name: "categoryId",
                  value: currentProduct.categoryId,
                  placeholder: "Select category",
                  disabled: !isUserSelected,
                }}
                handleOnChange={handleProductChange}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.title,
                }))}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <CustomInput
                label="Product"
                inputAttributes={{
                  type: "select",
                  name: "productId",
                  value: currentProduct.productId,
                  placeholder: "Select product",
                  disabled: !isUserSelected || filteredProducts.length === 0,
                }}
                handleOnChange={handleProductChange}
                options={
                  filteredProducts.length > 0
                    ? filteredProducts.map((p) => ({
                        value: p._id,
                        label: p.name,
                      }))
                    : [{ value: "", label: "No products available" }]
                }
              />
            </Col>
            <Col md={3}>
              <CustomInput
                label="Quantity"
                inputAttributes={{
                  type: "number",
                  name: "quantity",
                  value: currentProduct.quantity,
                  min: 1,
                  max: availableQuantity,
                  placeholder: "Enter quantity",
                  disabled: !currentProduct.productId,
                }}
                handleOnChange={handleProductChange}
              />
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button
                variant="secondary"
                onClick={handleAddProduct}
                disabled={!currentProduct.productId}
              >
                Add Product
              </Button>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <CustomInput
                label="Address"
                inputAttributes={{
                  type: "text",
                  placeholder: "Enter address",
                  name: "address",
                  value: formData.address,
                  disabled: !isUserSelected,
                  required: true,
                }}
                handleOnChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                label="Total Price ($)"
                inputAttributes={{
                  type: "text",
                  value: formData.totalPrice,
                  readOnly: true,
                }}
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
