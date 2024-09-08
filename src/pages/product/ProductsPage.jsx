import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../redux/product/productActions";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to get all products
    dispatch(getProductsAction());
  }, [dispatch]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const title = product.name ? product.name.toLowerCase() : "";
    const category = product.parentCategory
      ? product.parentCategory.toLowerCase()
      : "";
    const search = searchTerm.toLowerCase();
    return title.includes(search) || category.includes(search);
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={9}>
          <Form.Control
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>

        <Col xs={3}>
          <Link to="/admin/new-product">
            <Button variant="success" className="btn-md">
              Create new product
            </Button>
          </Link>
        </Col>
      </Row>

      <Stack gap={4}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Stack>

      {/* Pagination Controls */}
      <Pagination className="mt-3">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
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
    </Container>
  );
};

export default ProductPage;
