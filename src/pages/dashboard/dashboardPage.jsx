import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaBox,
  FaTags,
  FaCheckCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import "./Dashboard.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { users } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);

  // Calculate confirmed orders
  const confirmedOrders = products.filter(
    (product) => product.status === "confirmed"
  ).length;

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/orders">
              <Card.Body>
                <FaShoppingCart
                  size={50}
                  className="dashboard-icon"
                  color="#4e73df"
                />
                <Card.Title>
                  <CountUp end={orders.length} duration={2} /> Orders
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/sales">
              <Card.Body>
                <FaDollarSign
                  size={50}
                  className="dashboard-icon"
                  color="#1cc88a"
                />
                <Card.Title>
                  <CountUp end={15000} duration={2} separator="," prefix="$" />{" "}
                  Sales
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/users">
              <Card.Body>
                <FaUsers size={50} className="dashboard-icon" color="#36b9cc" />
                <Card.Title>
                  <CountUp end={users.length} duration={2} /> Users
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/products">
              <Card.Body>
                <FaBox size={50} className="dashboard-icon" color="#f6c23e" />
                <Card.Title>
                  <CountUp end={products.length} duration={2} /> Products
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/categories">
              <Card.Body>
                <FaTags size={50} className="dashboard-icon" color="#e74a3b" />
                <Card.Title>
                  <CountUp end={categories.length} duration={2} /> Categories
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/confirmed-orders">
              <Card.Body>
                <FaCheckCircle
                  size={50}
                  className="dashboard-icon"
                  color="#28a745"
                />
                <Card.Title>
                  <CountUp end={confirmedOrders} duration={2} /> Confirmed
                  Orders
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
