import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { signout } from "./action/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Footer from "./components/Footer";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      {/* Nav */}
      <nav
        class="navbar navbar-expand-lg navbar-light border-bottom border-secondary border-bottom-2 sticky-top"
        style={{ backgroundColor: "white" }}
      >
        <div class="container">
          <Link className="navbar-brand" to="/">
            <img className="brand_logo" src="images/h&m_logo.png" alt="" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Products
                </a>
              </li>
              {userInfo ? (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        User Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orderhistory">
                        Order History
                      </Link>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/signin">
                      Sign In
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orderhistory">
                        Order History
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/productlist">
                        Product List
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/userlist">
                        User List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/#">
                        Orders
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

              <li class="nav-item">
                <Link className="nav-link cart" to="/cart">
                  <ShoppingCartIcon style={{ fontSize: 28 }} />

                  {cartItems.length > 0 && (
                    <span className="badge">
                      <span>{cartItems.length}</span>
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Router Screen */}
      <main className="my-auto">
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route path="/profile" component={ProfileScreen}></Route>
        <Route
          path="/productlist"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <ProductListScreen {...props}></ProductListScreen>
            ) : (
              <Redirect to="/"></Redirect>
            )
          }
        ></Route>
        <Route
          path="/product/:id/edit"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <ProductEditScreen {...props}></ProductEditScreen>
            ) : (
              <Redirect to="/signin" />
            )
          }
        ></Route>
        <Route
          path="/userlist"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <UserListScreen {...props}></UserListScreen>
            ) : (
              <Redirect to="/"></Redirect>
            )
          }
        ></Route>
        <Route
          path="/users/:id/edit"
          exact
          render={(props) =>
            userInfo && userInfo.isAdmin ? (
              <UserEditScreen {...props}></UserEditScreen>
            ) : (
              <Redirect to="/"></Redirect>
            )
          }
        ></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>

      {/* Footer Component */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
