import { useEffect } from "react";
import { getProductsAction } from "../../redux/product/productActions";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch action to get all products
    dispatch(getProductsAction());
  }, [dispatch]);
  return (
    <>
      <Container>
        <Row>
          <Col xs={8}>
            <Stack gap={4}>
              <Form.Control type="text" placeholder="Search by title..." />

              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </Stack>
          </Col>

          <Col xs={4} className="text-end">
            <Link to="/admin/new-product">
              <Button variant="success" className="btn-md">
                Create
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
