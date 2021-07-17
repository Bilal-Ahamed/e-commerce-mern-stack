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
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazon
            </Link>
          </div>
          <div className="row">
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History </Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/signin">Sign In</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Product List </Link>
                  </li>
                  <li>
                    <Link to="/userlist">User List</Link>
                  </li>
                  <li>
                    <Link to="#">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

            <Link to="/cart" className="row">
              <ShoppingCartIcon style={{ fontSize: 28 }} />{" "}
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </header>
        <main>
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
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
