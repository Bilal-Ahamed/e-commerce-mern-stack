import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  return (
    <div className="d-flex justify-content-center align-items-start py-5">
      <form onSubmit={submitHandler}>
        <h2 className="mb-4">Sign In</h2>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            placeholder="example@email.com"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div class="form-text">8-20 Characters</div>
        </div>
        <div class="mb-4 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <div class="d-grid mb-4">
          <button type="submit" class="btn btn-outline-dark ">
            Sign In
          </button>
        </div>

        <div className="">
          New customer?{" "}
          <Link
            className="text-decoration-none"
            to={`/register?redirect=${redirect}`}
          >
            Create your account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
