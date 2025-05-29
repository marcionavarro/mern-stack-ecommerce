import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/NavBar";
import NoProducts from "../components/NoProducts";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import Product from "../components/Product";
import { getProduct, removeErrors } from "../features/products/productSlice";
import "../pageStyles/Products.css";

function Products() {
  const { loading, error, products, resultsPerPage, productCount } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const pageFromUrl = parseInt(searchParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const navigate = useNavigate();
  const categories = ["laptop", "mobile", "tv", "fruits", "glass"];

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newUrlSearchParams = new URLSearchParams(location.search);
      if(page === 1){
        newUrlSearchParams.delete('page');
      }else {
        newUrlSearchParams.set('page', page);
      }
      navigate(`?${newUrlSearchParams.toString()}`)
    }
  };

  const handleCategoryClick = (category) => {
    const newUrlSearchParams = new URLSearchParams(location.search);
    newUrlSearchParams.set('category', category);
    newUrlSearchParams.delete('page');
    navigate(`?${newUrlSearchParams.toString()}`)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />
          <div className="products-layout">
            <div className="filter-section">
              <h3 className="filter-heading">CATEGORIES</h3>
              {/* Render Categories */}
              <ul>
                {categories.map((category) => {
                  return (
                    <li key={category} onClick={() => handleCategoryClick(category)}>{category}</li>
                  )
                })}
              </ul>
            </div>
            <div className="products-section">
              {products.length > 0 ? (
                <div className="products-product-container">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProducts keyword={keyword} />
              )}
              <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Products;
