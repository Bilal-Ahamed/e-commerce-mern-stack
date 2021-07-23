import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../action/productActions";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const productId = props.match.params.id;
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, []);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <React.Fragment>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="container py-5">
          {/* <Link to="/">Back to home</Link> */}
          <div className="row row-cols-1 row-cols-md-3">
            <div className="col-md-6">
              <img
                // style={{ maxWidth: 300 }}
                className="img-fluid"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <ul>
                <li>
                  <h2>{product.name}</h2>
                </li>
                <li className="mb-3">
                  <h6>{product.brand}</h6>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li className="mb-3 text-danger fs-5">
                  ${Number(product.price).toFixed(2)}
                </li>
                <li className="text-secondary fw-light">
                  <p>{product.description}</p>
                </li>
              </ul>

              <ul>
                <li className="mb-2">
                  <h5 className="mb-1">Status</h5>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="text-success fs-5">In Stock</span>
                    ) : (
                      <span className="text-danger fs-5">Unavailable</span>
                    )}
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li className="mb-4">
                      <div className="">
                        <h5 className="mb-2">Qty</h5>
                        <div className="">
                          <select
                            style={{ width: 70 }}
                            className="form-select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (item) => (
                                <option key={item + 1} value={item + 1}>
                                  {item + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        className="btn btn-dark"
                        onClick={addToCartHandler}
                      >
                        Add to cart
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ProductScreen;
