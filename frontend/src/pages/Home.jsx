import React from "react";
import Footer from "../components/Footer";
import "../pageStyles/Home.css";
import Navbar from "../components/Navbar";
import { ImageSlider } from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";

const products = [
  {
    _id: "67af628161452d7d2bcbf86d",
    name: "Product 2",
    description: "Product description2",
    price: 80,
    ratings: 0,
    image: [
      {
        public_id: "This is test id2",
        url: "This is test rul2",
        _id: "67af628161452d7d2bcbf86e",
      },
    ],
    category: "phone",
    stock: 0,
    numOfReviews: 1,
    reviews: [
      {
        user: "67bce99c4d54d700a19c4a6d",
        name: "Fullstack Develloper",
        rating: 3,
        _id: "67bf735af6e030212c02fd9c",
        comment: "Good",
      },
    ],
    createdAt: "2025-02-14T15:34:25.406Z",
    __v: 1,
  },
  {
    _id: "67af62a461452d7d2bcbf873",
    name: "Mobile",
    description: "Product description3",
    price: 1400,
    ratings: 2,
    image: [
      {
        public_id: "This is test id3",
        url: "This is test rul3",
        _id: "67af62a461452d7d2bcbf874",
      },
    ],
    category: "mobile",
    stock: 1,
    numOfReviews: 2,
    reviews: [
      {
        user: "67bce99c4d54d700a19c4a6d",
        name: "Fullstack Develloper",
        rating: 2,
        comment: "Novo Teste",
        _id: "67bf7699c5728e42c18df937",
      },
    ],
    createdAt: "2025-02-14T15:35:00.519Z",
    __v: 2,
  },
];

function Home() {
  return (
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
  );
}

export default Home;
