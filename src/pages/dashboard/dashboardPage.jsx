import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import {
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaBox,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import "./Dashboard.css";

// Chart.js config
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { deleteOrderAction } from "../../redux/order/orderAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler
);

const Dashboard = () => {
  const { users } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const chartColors = {
    purple: "rgba(102, 16, 242, 0.8)",
    purpleFill: "rgba(102, 16, 242, 0.2)",
    green: "rgba(28, 200, 138, 0.8)",
    greenFill: "rgba(28, 200, 138, 0.2)",
  };

  // Sales Over the Past 7 Days
  const salesByDay = new Array(7).fill(0);
  orders.forEach((order) => {
    const day = new Date(order.date).getDay(); // Get the day (0 for Sunday, 6 for Saturday)
    salesByDay[day] += order.totalPrice; // Add the totalPrice to the respective day
  });

  const salesData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Sales ($)",
        data: salesByDay, // Use calculated sales by day
        fill: true,
        backgroundColor: chartColors.purpleFill,
        borderColor: chartColors.purple,
        tension: 0.3,
      },
    ],
  };

  // Top Categories Sold
  const categorySales = categories.reduce((acc, category) => {
    acc[category.title] = 0; // Initialize count for each category
    return acc;
  }, {});

  orders.forEach((order) => {
    order.products.forEach((orderProduct) => {
      // Find the product in the products collection by matching productId
      const product = products.find(
        (prod) => prod._id === orderProduct.productId
      );
      if (product) {
        // Find the category that matches the product's parentCategory
        const category = categories.find(
          (cat) => cat.title === product.parentCategory
        );
        if (category) {
          categorySales[category.title] += orderProduct.quantity; // Add quantity to the category
        }
      }
    });
  });

  const categoriesData = {
    labels: Object.keys(categorySales),
    datasets: [
      {
        label: "Top Categories Sold",
        data: Object.values(categorySales),
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        borderWidth: 1,
      },
    ],
  };
  const handleDelete = (order) => {
    dispatch(deleteOrderAction(order));
  };

  // Get the latest 5 orders
  const latestOrders = orders.slice(-5).reverse(); // Slice the last 5 orders and reverse to show the most recent first

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
                  <CountUp
                    end={salesByDay.reduce((acc, curr) => acc + curr, 0)}
                    duration={2}
                    separator=","
                    prefix="$"
                  />{" "}
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
        <Col md={6}>
          <Card className="dashboard-card">
            <Card.Body>
              <h6>Sales Over the Past 7 Days</h6>
              <Line data={salesData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="dashboard-card">
            <Card.Body>
              <h6>Top Categories Sold</h6>
              <Bar data={categoriesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="dashboard-card">
            <Card.Header>
              Recent Orders
              <Link to="/admin/orders" style={{ float: "right" }}>
                <Button variant="primary">Show All</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order Id</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Amount</th>
                    <th>Placed Date</th>
                    <th>Delivery Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {latestOrders.map((order, index) => {
                    // Find the user matching the order's userId
                    const user = users.find(
                      (user) => user._id === order.userId
                    );
                    const customerName = user
                      ? `${user.firstName} ${user.lastName}`
                      : "Unknown User";

                    return (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.orderId}</td>
                        <td>{customerName}</td>
                        <td>
                          {order.products
                            .map((p) => ` ${p.productName} (${p.quantity})`)
                            .join(", ")}
                        </td>
                        <td>${order.totalPrice}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "confirmed"
                                ? "bg-primary"
                                : order.status === "pending"
                                ? "bg-info"
                                : "bg-warning"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <FaTrash
                            color="red"
                            style={{ cursor: "pointer", marginLeft: 10 }}
                            onClick={() => handleDelete(order)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
