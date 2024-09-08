import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import { getCategoriesAction } from "../../redux/category/categoryActions";

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={9}>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>

        <Col xs={3}>
          <Link to="/admin/new-category">
            <Button variant="success" className="btn-md w-100">
              Create
            </Button>
          </Link>
        </Col>
      </Row>

      <Stack direction="vertical" gap={2} className="mt-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </Stack>
    </Container>
  );
};

export default CategoriesPage;
