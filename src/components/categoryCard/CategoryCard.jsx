import { Button, Card, Image, Stack } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  const { category } = props;

  return (
    <Card className="d-flex flex-row align-items-center rounded shadow">
      <Image
        src={category.thumbnail}
        width={80}
        height={80}
        className="p-1"
        rounded
      />

      <Card.Body>
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-between"
        >
          <Card.Title>{category.title}</Card.Title>

          <Stack direction="horizontal" gap={2}>
            <Link to={`/admin/edit-category/${category._id}`}>
              <Button variant="outline-success">
                <BsPencil />
              </Button>
            </Link>
            <Button variant="outline-danger">
              <BsTrash />
            </Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;