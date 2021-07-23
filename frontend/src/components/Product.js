import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;

  return (
    <div class="col mb-5">
      {/* <div class="card border-0">
        <img src={product.image} class="card-img-top img-fluid" alt="product" />
        <div class="card-body ">
          <h5 class="card-title">{product.name}</h5>
          <p class="card-text fs-6 fw-light">{product.description}</p>
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

      <div className="d-flex">
        <div className="">
          <Link to={`/product/${product._id}`}>
            <img className="img-fluid" src={product.image} alt="" />
          </Link>
        </div>
        <div className="">
          <h4 className="mb-3">{product.name}</h4>
          <h6 className="fw-bold mb-3">{product.brand}</h6>
          <h5 className="mb-3">${Number(product.price).toFixed(2)}</h5>
          <Link
            className="btn btn-outline-dark btn-sm mb-3"
            to={`/product/${product._id}`}
          >
            See Details
          </Link>
          <p className="fw-light text-secondary">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
