import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, editUser } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_EDIT_RESET } from "../constants/userConstants";

function UserEditScreen(props) {
  const userId = props.match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = userEdit;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(detailsUser(userId));
    } else if (user && successEdit) {
      setName(name);
      setEmail(email);
      setIsAdmin(isAdmin);

      setTimeout(() => {
        dispatch({ type: USER_EDIT_RESET });
        dispatch(detailsUser(userId));
      }, 3000);
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }

    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user, successEdit, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editUser(userId, { name, email, isAdmin }, props));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Edit for ${userId}</h1>
        </div>
        {loadingEdit && <LoadingBox></LoadingBox>}
        {errorEdit && <MessageBox variant="danger">{errorEdit}</MessageBox>}
        {successEdit && (
          <MessageBox variant="success">
            User Info Successfully Edited
          </MessageBox>
        )}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin?</label>
              <select
                id="isAdmin"
                value={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.value);
                }}
              >
                <option value={false}>No</option>
                <option value={true}>Admin</option>
              </select>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Edit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default UserEditScreen;
