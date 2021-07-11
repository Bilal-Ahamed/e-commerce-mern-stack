import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteUser, listUsers } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_EDIT_RESET } from "../constants/userConstants";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = userEdit;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(listUsers());
    }
    if (successDelete) {
      dispatch(listUsers());
    }
    if (successEdit) {
      dispatch(listUsers());
    }
  }, [successDelete, successEdit]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(user._id));
    }
  };

  const history = useHistory();

  const editHandler = (userId) => {
    history.push(`/users/${userId}/edit`);
  };

  return (
    <div>
      <div className="row">
        <h1>User List</h1>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {successDelete && (
        <MessageBox variant="success">User deleted successfully</MessageBox>
      )}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Admin" : "No"}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => editHandler(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
