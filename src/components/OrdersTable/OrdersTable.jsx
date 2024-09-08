import React from "react";
import {
  Tab,
  Tabs,
  Table,
  Badge,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//import { updateOrderStatus, deleteOrder } from "../../redux/order/orderAction"; // Assuming you have these actions defined

const OrderTable = ({
  orders,
  users,
  showActions = false,
  searchTerm = "",
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const ordersPerPage = 10;

  // Filter orders based on searchTerm
  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users
        .find((user) => user._id === order.userId)
        ?.firstName.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      users
        .find((user) => user._id === order.userId)
        ?.lastName.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handleApprove = (orderId) => {
    dispatch(updateOrderStatus(orderId, "confirmed"));
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Product Name(s)</th>
            <th>User Name</th>
            <th>Address</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Status</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={order.orderId}>
              <td>{index + 1 + indexOfFirstOrder}</td>
              <td>{order.orderId}</td>
              <td>
                {order.products.map((product, idx) => (
                  <div key={idx}>
                    {product.productName} (Qty: {product.quantity})
                  </div>
                ))}
              </td>
              <td>
                {users.find((user) => user._id === order.userId)?.firstName}{" "}
                {users.find((user) => user._id === order.userId)?.lastName}
              </td>
              <td>{order.address}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>$ {order.totalPrice}</td>
              <td>
                <Badge
                  bg={
                    order.status === "complete"
                      ? "success"
                      : order.status === "pending"
                      ? "warning"
                      : order.status === "cancelled"
                      ? "danger"
                      : "info"
                  }
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </td>
              {showActions && (
                <td>
                  {order.status === "pending" && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleApprove(order.orderId)}
                    >
                      Approve
                    </Button>
                  )}
                  <Button variant="warning" size="sm" className="mx-1">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(order.orderId)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredOrders.length / ordersPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </>
  );
};

const OrdersTable = () => {
  const orders = useSelector((state) => state.order.orders);
  const users = useSelector((state) => state.user.users);
  const [searchTerm, setSearchTerm] = React.useState("");

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search by user or order ID"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-3"
      />
      <Tabs defaultActiveKey="all" id="order-tabs">
        <Tab eventKey="all" title="All Orders">
          <OrderTable orders={orders} users={users} searchTerm={searchTerm} />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <OrderTable
            orders={getOrdersByStatus("complete")}
            users={users}
            searchTerm={searchTerm}
          />
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <OrderTable
            orders={getOrdersByStatus("pending")}
            users={users}
            searchTerm={searchTerm}
          />
        </Tab>
        <Tab eventKey="shipped" title="Shipped">
          <OrderTable
            orders={getOrdersByStatus("shipped")}
            users={users}
            searchTerm={searchTerm}
          />
        </Tab>
        <Tab eventKey="manage" title="Manage Orders">
          <OrderTable
            orders={orders}
            users={users}
            showActions={true}
            searchTerm={searchTerm}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default OrdersTable;
