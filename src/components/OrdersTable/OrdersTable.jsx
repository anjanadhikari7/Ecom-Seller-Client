import React, { useState } from "react";
import {
  Table,
  Badge,
  Button,
  Pagination,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaTrash, FaShippingFast } from "react-icons/fa"; // Import icons
import { IoMdCheckmark } from "react-icons/io";
import {
  deleteOrderAction,
  updateOrderAction,
} from "../../redux/order/orderAction";
import EditOrderModal from "../EditOrderModal/EditOrderModal";

const OrdersTable = () => {
  const orders = useSelector((state) => state.order.orders);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleApprove = (order) => {
    let newStatus;
    switch (order.status) {
      case "pending":
        newStatus = "shipped";
        break;
      case "shipped":
        newStatus = "completed";
        break;
      default:
        newStatus = order.status;
    }
    dispatch(
      updateOrderAction({
        ...order,
        status: newStatus,
      })
    );
  };

  const handleDelete = (order) => {
    dispatch(deleteOrderAction(order));
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  const handleSaveOrder = (updatedOrder) => {
    dispatch(updateOrderAction(updatedOrder));
    handleCloseEditModal();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
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
                <th>Actions</th>
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
                        order.status === "completed"
                          ? "success"
                          : order.status === "pending"
                          ? "warning"
                          : order.status === "shipped"
                          ? "info"
                          : "danger"
                      }
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    {order.status === "pending" && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(order)}
                      >
                        <FaShippingFast />
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(order)}
                      >
                        <IoMdCheckmark />
                      </Button>
                    )}
                    {order.status === "pending" && (
                      <Button
                        variant="warning"
                        size="sm"
                        className="mx-1"
                        onClick={() => handleEdit(order)}
                      >
                        <FaEdit />
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(order)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
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
        </Tab>
        <Tab eventKey="completed" title="Completed">
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getOrdersByStatus("completed").map((order, index) => (
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
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
                    <Badge bg="success">Completed</Badge>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(order)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
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
                <th>Product Name(s)</th>
                <th>User Name</th>
                <th>Address</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getOrdersByStatus("pending").map((order, index) => (
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
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
                    <Badge bg="warning">Pending</Badge>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleApprove(order)}
                    >
                      <FaShippingFast />
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="mx-1"
                      onClick={() => handleEdit(order)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(order)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="shipped" title="Shipped">
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getOrdersByStatus("shipped").map((order, index) => (
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
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
                    <Badge bg="info">Shipped</Badge>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleApprove(order)}
                    >
                      <IoMdCheckmark />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(order)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {selectedOrder && (
        <EditOrderModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleSave={handleSaveOrder}
          order={selectedOrder}
        />
      )}
    </>
  );
};

export default OrdersTable;
