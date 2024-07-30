import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryForm from "../../components/categoryForm/CategoryForm";

const EditCategoryPage = () => {
  const { id } = useParams();

  const { categories } = useSelector((state) => state.category);
  const category = categories?.find((category) => category._id === id);

  const categoryData = {
    thumbnail: "",
    _id: category?._id,
    title: category?.title,
  };

  return (
    <>
      <Alert variant="info" className="text-dark fw-bold fs-4">
        Edit Category
      </Alert>

      <CategoryForm initialFormData={categoryData} />
    </>
  );
};

export default EditCategoryPage;
