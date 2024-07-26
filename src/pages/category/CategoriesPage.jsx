import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import { useEffect } from "react";
import { getCategoriesAction } from "../../redux/category/categoryActions";

const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col xs={9}>
          <Form.Control type="text" placeholder="Search by title..." />
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
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </Stack>
    </Container>
  );
};

export default CategoriesPage;
