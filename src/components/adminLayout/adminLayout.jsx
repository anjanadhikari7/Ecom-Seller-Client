import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Row, Col, Card, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  FaTachometerAlt,
  FaTag,
  FaBox,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa"; // Colorful icons

import {
  getAllUserAction,
  logoutUserAction,
} from "../../redux/user/userActions";
import SidebarItem from "../SideBarItem/sideBarItem";
import { getProductsAction } from "../../redux/product/productActions";
import { getCategoriesAction } from "../../redux/category/categoryActions";
import { getOrdersAction } from "../../redux/order/orderAction";
import UserImage from "../../assets/UserImage.png";
import logo from "../../assets/logo.png";

const iconStyles = {
  transition: "transform 0.3s ease, color 0.3s ease",
};

const activeIconStyles = {
  color: "#007bff", // Change this to your desired active color
  transform: "scale(1.2)",
};

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const { user } = useSelector((state) => state.user);
  const { firstName, lastName, email } = user || {};

  const dispatch = useDispatch();
  const location = useLocation(); // Hook to get the current location

  // Update activeItem based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/admin/orders")) setActiveItem("Order");
    else if (path.includes("/admin/products")) setActiveItem("Product");
    else if (path.includes("/admin/categories")) setActiveItem("Category");
    else if (path.includes("/admin/users")) setActiveItem("User");
    else setActiveItem("Dashboard");
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutUserAction(email));
  };

  useEffect(() => {
    dispatch(getProductsAction());
    dispatch(getAllUserAction());
    dispatch(getCategoriesAction());
    dispatch(getOrdersAction());
  }, [dispatch]);

  return (
    <Container fluid className="p-0 d-flex flex-column min-vh-100">
      {/* Sticky Navbar */}
      <Navbar
        expand="lg"
        className="px-4 sticky-top shadow-sm"
        style={{ zIndex: 1050, backgroundColor: "#C4CAD0" }}
      >
        <Navbar.Brand
          as={Link}
          to="/admin/"
          className="d-flex align-items-center"
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              marginRight: "10px",
              transition: "transform 0.3s ease",
            }}
            className="logo-img"
          />
          <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Admin</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/admin/account">
              My Account
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row className="flex-nowrap flex-grow-1">
        {/* Sidebar */}
        <Col
          xs={3}
          className="bg-light shadow-sm p-3 position-fixed"
          style={{ zIndex: 1000 }}
        >
          <Stack className="h-100">
            <Card className="text-center fw-bold">
              <Card.Header>
                <img
                  src={UserImage}
                  alt="User"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              </Card.Header>
              <Card.Body>{firstName + " " + lastName}</Card.Body>
            </Card>

            {/* Menu Items */}
            <Stack className="my-4">
              <SidebarItem
                icon={<FaTachometerAlt style={iconStyles} />}
                label="Dashboard"
                path="/admin/"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                iconStyles={iconStyles}
                activeIconStyles={activeIconStyles}
              />
              <SidebarItem
                icon={<FaTag style={iconStyles} />}
                label="Category"
                path="/admin/categories"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                iconStyles={iconStyles}
                activeIconStyles={activeIconStyles}
              />
              <SidebarItem
                icon={<FaBox style={iconStyles} />}
                label="Product"
                path="/admin/products"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                iconStyles={iconStyles}
                activeIconStyles={activeIconStyles}
              />
              <SidebarItem
                icon={<FaShoppingCart style={iconStyles} />}
                label="Order"
                path="/admin/orders"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                iconStyles={iconStyles}
                activeIconStyles={activeIconStyles}
              />
              <SidebarItem
                icon={<FaUsers style={iconStyles} />}
                label="User"
                path="/admin/users"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                iconStyles={iconStyles}
                activeIconStyles={activeIconStyles}
              />
            </Stack>
          </Stack>
        </Col>

        {/* Main Content */}
        <Col
          style={{ marginLeft: "25%", backgroundColor: "#CCCCCC" }}
          className="flex-grow-1"
        >
          <div className="pt-4">
            <Outlet />
          </div>
        </Col>
      </Row>

      {/* Footer */}
      <footer
        className="text-center py-2 mt-auto"
        style={{ backgroundColor: "#C4CAD0" }}
      >
        <small>&copy; 2024 Anjan. All rights reserved.</small>
      </footer>
    </Container>
  );
};

export default AdminLayout;
