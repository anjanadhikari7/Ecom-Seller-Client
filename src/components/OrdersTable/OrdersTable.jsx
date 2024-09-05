import React from "react";
import { Tab, Tabs, Table, Badge, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//import { updateOrderStatus, deleteOrder } from "../actions/orderActions"; // Assuming you have these actions defined

const OrderTable = ({ orders, users, showActions = false }) => {
  const dispatch = useDispatch();

  const handleApprove = (orderId) => {
    dispatch(updateOrderStatus(orderId, "confirmed"));
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Order ID</th>
          <th>Product Name(s)</th> {/* Adjust column title */}
          <th>User Name</th>
          <th>Address</th>
          <th>Date</th>
          <th>Total Price</th>
          <th>Status</th>
          {showActions && <th>Actions</th>}{" "}
          {/* Conditionally show Actions column */}
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order.id}>
            <td>{index + 1}</td>
            <td>{order.orderId}</td>

            {/* Display multiple products with their names and quantities */}
            <td>
              {order.products.map((product, idx) => (
                <div key={idx}>
                  {product.productName} (Qty: {product.quantity})
                </div>
              ))}
            </td>

            {/* Display user name */}
            <td>
              {users.find((user) => user._id === order.userId)?.firstName}{" "}
              {users.find((user) => user._id === order.userId)?.lastName}
            </td>

            <td>{order.address}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>

            {/* Display total price for the order */}
            <td>$ {order.totalPrice}</td>

            {/* Display order status with badge */}
            <td>
              <Badge
                bg={
                  order.status === "complete"
                    ? "success"
                    : order.status === "pending"
                    ? "warning"
                    : order.status === "cancelled"
                    ? "danger"
                    : "info" // For confirmed status
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </td>

            {/* Conditionally show action buttons */}
            {showActions && (
              <td>
                {order.status === "pending" && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(order.id)}
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
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const OrdersTable = () => {
  const orders = useSelector((state) => state.order.orders);
  const users = useSelector((state) => state.user.users);

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <Tabs defaultActiveKey="all" id="order-tabs">
      <Tab eventKey="all" title="All Orders">
        <OrderTable orders={orders} users={users} />
      </Tab>
      <Tab eventKey="completed" title="Completed">
        <OrderTable orders={getOrdersByStatus("complete")} users={users} />
      </Tab>
      <Tab eventKey="pending" title="Pending">
        <OrderTable orders={getOrdersByStatus("pending")} users={users} />
      </Tab>
      <Tab eventKey="cancelled" title="Cancelled">
        <OrderTable orders={getOrdersByStatus("cancelled")} users={users} />
      </Tab>
      <Tab eventKey="manage" title="Manage Orders">
        <OrderTable orders={orders} users={users} showActions={true} />
      </Tab>
    </Tabs>
  );
};

export default OrdersTable;
