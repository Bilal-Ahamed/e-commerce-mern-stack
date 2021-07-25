import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../data";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LoadingBox from "../components/LoadingBox";
import Filter from "../components/Filter";

function Classification(props) {
  const gender = props.match.params.gender;
  const category = props.match.params.category;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [origin, setOrigin] = useState([]);

  useEffect(async () => {
    setLoading(true);
    if (category) {
      const { data } = await axios.get(
        `/api/classification/${gender}/${category}`
      );
      setProducts(data);
      setLoading(data);
    } else {
      const { data } = await axios.get(`/api/classification/${gender}`);
      setProducts(data);
      setOrigin(data);
    }
    setLoading(false);
  }, [gender, category]);

  // when user changes order option, this function is called
  const sortProducts = (e) => {
    const sortBy = e.target.value;

    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sortBy === "lowest"
            ? a.price - b.price
            : sortBy === "highest"
            ? b.price - a.price
            : sortBy === "latest"
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        )
    );
  };

  return loading ? (
    <LoadingBox />
  ) : (
    <div className="container my-5">
      {/* Our New Products */}
      <div className="row row-1 row-md-2">
        {/* Side bar component for category */}
        <Sidebar gender={gender} />
        <div className="col-10">
          <div className="d-flex justify-content-center mb-3">
            <Link className="text-dark text-decoration-none fw-lighter" to="/">
              home{" "}
            </Link>
            <span className="fw-lighter">{" / "}</span>
            <Link
              className="text-dark text-decoration-none fw-lighter"
              to="/classification/women"
            >
              {gender}
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center mb-5 px-5">
            <h1 className="fs-1 fw-bold mb-3">
              {gender === "women" ? "Women's Clothing" : "Men's Clothing"}
            </h1>
            <p className="fs-6 fw-light text-secondary">
              {gender === "women"
                ? data.staticText.womenText
                : data.staticText.menText}
            </p>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center mb-5">
            <h1>Our New Products</h1>
            <p className="fs-5 fw-light">
              Here's Our Gorgeous {gender} Product
            </p>
          </div>

          <Filter count={products?.length} sortProducts={sortProducts} />

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classification;
