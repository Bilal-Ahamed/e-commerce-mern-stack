import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;

  return (
    <div className="col mb-5">
      {/* <div className="card border-0">
        <img src={product.image} className="card-img-top img-fluid" alt="product" />
        <div className="card-body ">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text fs-6 fw-light">{product.description}</p>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <Link
            className="btn btn-outline-dark d-grid"
            to={`/product/${product._id}`}
          >
            See Details
          </Link>
        </div>
      </div> */}

      <div className="d-flex flex-column">
        <div className="">
          <Link to={`/product/${product._id}`}>
            <img
              className="img-fluid mb-3"
              src={product.image}
              alt=""
              style={{ height: 300 }}
            />
          </Link>
        </div>
        <div className="">
          <h6 className="fw-light text-secondary">{product.brand}</h6>
          <Link
            className="text-decoration-none text-dark"
            to={`/product/${product._id}`}
          >
            <h5 className="mb-3">{product.name}</h5>
          </Link>
          <h6 className="mb-3">${Number(product.price).toFixed(2)}</h6>
          {/* <Link
            className="btn btn-outline-dark btn-sm mb-3"
            to={`/product/${product._id}`}
          >
            See Details
          </Link> */}
          {/* <p className="fw-light text-secondary">{product.description}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Product;
