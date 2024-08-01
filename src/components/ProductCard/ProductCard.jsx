/* eslint-disable react/prop-types */
import { Badge, Button, Card, Image, Stack } from "react-bootstrap";
import { BsImages, BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { product } = props;

  const deleteProduct = () => {
    // dispatch delete action
  };
  const salesStartDate = new Date(product.salesStartDate).getTime();
  const salesEndDate = new Date(product.salesEndDate).getTime();
  const now = Date.now();

  const productIsOnSale = salesStartDate <= now && salesEndDate >= now;
  const discountPercentage = productIsOnSale
    ? Math.round(((product.price - product.salesPrice) / product.price) * 100)
    : 0;

  const isActive = product.status === "active";

  return (
    <Card className="d-flex flex-row align-items-center rounded">
      <Image
        src={product?.thumbnail}
        width={100}
        height={100}
        className="p-1"
        rounded
      />

      <Card.Body>
        <Stack direction="horizontal" gap={2}>
          <Stack>
            <Card.Title>
              {product.name}{" "}
              {isActive ? (
                <Badge bg="success" className="p-2">
                  {" "}
                </Badge>
              ) : (
                <Badge bg="success" className="p-4">
                  {" "}
                </Badge>
              )}
            </Card.Title>
            <Badge bg="secondary" style={{ width: "fit-content" }}>
              {product.parentCategory}
            </Badge>
            <Card.Text className="fw-bold">
              {productIsOnSale ? (
                <>
                  <span style={{ color: "red" }}>${product.salesPrice}</span>{" "}
                  <span style={{ textDecoration: "line-through" }}>
                    ${product.price}
                  </span>
                </>
              ) : (
                <>${product.price}</>
              )}{" "}
              | QTY: {product.quantity}{" "}
              {productIsOnSale && (
                <Badge bg="danger">On Sale ({discountPercentage}% off)</Badge>
              )}
            </Card.Text>
          </Stack>

          <Stack direction="horizontal" gap={2}>
            <Link to={`/admin/edit-product/${product._id}`}>
              <Button variant="outline-success">
                <BsPencil />
              </Button>
            </Link>

            <Link to={`/admin/manage-product-images/${product._id}`}>
              <Button variant="outline-primary">
                <BsImages />
              </Button>
            </Link>

            <Button variant="outline-danger" onClick={deleteProduct}>
              <BsTrash />
            </Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
