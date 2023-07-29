import useCategory from "../hooks/useCategory";
import Jumbotron from "../components/cards/Jumbotron";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const categories = useCategory();

  return (
    <>
      <Jumbotron title="Categories" subTitle="List of all categories" />

      <div className="container overflow-hidden">
        <div className="row gx-5 gy-5 mt-3 mb-5">
          {categories?.map((category) => (
            <div className="col-md-6" key={category._id}>
              <button className="btn btn-light col-12 text-dark p-3">
                <Link to={`/category/${category.slug}`}>{category.title}</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
