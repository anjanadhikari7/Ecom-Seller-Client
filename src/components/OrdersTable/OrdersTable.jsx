import React from "react";
import { Tab, Tabs, Table, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrdersTable = () => {
  const orders = useSelector((state) => state.order.orders); // Get orders from store
  const users = useSelector((state) => state.user.users); // Get users from store
  const products = useSelector((state) => state.product.products); // Get products from store

  // Function to get orders based on status
  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <Tabs defaultActiveKey="all" id="order-tabs">
      <Tab eventKey="all" title="All Orders">
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>{users.find((user) => user.id === order.userId)?.name}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td> {/* Calculate Total Price */}
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
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey="completed" title="Completed">
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
            </tr>
          </thead>
          <tbody>
            {getOrdersByStatus("complete").map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>{users.find((user) => user.id === order.userId)?.name}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td> {/* Calculate Total Price */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey="pending" title="Pending">
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
            </tr>
          </thead>
          <tbody>
            {getOrdersByStatus("pending").map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>{users.find((user) => user.id === order.userId)?.name}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td> {/* Calculate Total Price */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey="cancelled" title="Cancelled">
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
            </tr>
          </thead>
          <tbody>
            {getOrdersByStatus("cancelled").map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>{users.find((user) => user.id === order.userId)?.name}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td> {/* Calculate Total Price */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Tab>
    </Tabs>
  );
};

export default OrdersTable;
