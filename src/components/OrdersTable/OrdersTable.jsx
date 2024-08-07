import React from "react";
import { Tab, Tabs, Table, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderTable = ({ orders, users }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Order ID</th>
          <th>Product Name</th>
          <th>User Name</th>
          <th>Address</th>
          <th>Date</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th> {/* New Total Price Column */}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order.id}>
            <td>{index + 1}</td> {/* Displaying index starting from 1 */}
            <td>{order.orderId}</td>
            <td>{order.productName}</td>
            <td>
              {users.find((user) => user._id === order.userId)?.firstName}{" "}
              {users.find((user) => user._id === order.userId)?.lastName}
            </td>
            <td>{order.address}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>{" "}
            {/* Localized Date */}
            <td>{order.price}</td>
            <td>{order.quantity}</td>
            <td>{order.totalPrice}</td> {/* Total Price */}
            <td>
              <Badge
                bg={
                  order.status === "complete"
                    ? "success"
                    : order.status === "pending"
                    ? "warning"
                    : "danger"
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const OrdersTable = () => {
  const orders = useSelector((state) => state.order.orders); // Get orders from store
  const users = useSelector((state) => state.user.users); // Get users from store

  // Function to get orders based on status
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
    </Tabs>
  );
};

export default OrdersTable;
