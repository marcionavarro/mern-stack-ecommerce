import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import "../pageStyles/Home.css";
import Navbar from "../components/Navbar";
import { ImageSlider } from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { toast } from "react-toastify";

function Home() {
  const { loading, error, products, productCount } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
  },[dispatch, error])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Home-My Website" />
          <Navbar />
          <ImageSlider />
          <div className="home-container">
            <h2 className="home-heading">Trending Now</h2>
            <div className="home-product-container">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
