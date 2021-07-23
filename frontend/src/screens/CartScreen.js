import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../action/cartActions";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="container">
      <h1 className="mb-5">Shopping Cart</h1>
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col col-9">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ul className="">
              {cartItems.map((item) => (
                <li key={item.product} className="mb-5">
                  <div className="row row-cols-5 align-items-center">
                    <div className="col-2">
                      <img
                        className="img-fluid"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="col-3">
                      <Link
                        className="text-decoration-none"
                        to={`/product/${item.product}`}
                      >
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="col-2">
                      <select
                        className="form-select"
                        style={{ width: 70 }}
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((item) => (
                          <option key={item + 1} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-2 fs-5">
                      ${Number(item.price).toFixed(2)}
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col col-3">
          <ul>
            <li className="mb-4">
              <h4>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {Number(
                  cartItems.reduce(
                    (a, c) => a + Number(c.price).toFixed(2) * c.qty,
                    0
                  )
                ).toFixed(2)}
              </h4>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="btn btn-outline-dark"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
