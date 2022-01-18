import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserAction,
  getAddress,
  obtainUserOrders,
  obtainUserPayment as obtainUserPayments,
} from "../../store/actions/userActions";
import { UserState } from "../../types";
import Layout from "../ui/Layout";

const UserIndex = () => {
  //* Router navigate
  let navigate = useNavigate();

  //* Global Redux store
  const { token, user, isAuth } = useSelector((state: UserState) => state);

  //* Dispatch to call actions
  const dispatch = useDispatch();

  //* useEffect to load info
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if (user.id !== undefined && isAuth && token) {
      dispatch(obtainUserOrders(user.id));
      dispatch(obtainUserPayments(user.id));
      dispatch( getAddress(user.id) );
    }
  }, [token, user, isAuth]);

  const deleteUser = () => {
     dispatch( deleteUserAction(Number(user.id)) );
  }

  return (
    <Layout>
      <h1 className="text-center mt-5">User Info</h1>
      <div className="container mt-5 mx-auto p-5 shadow bg-body rounded">
        <div className="row row-cols-1 row-cols-sm-2">
          <div className="col">
            <span className="fs-5">
              Name:
              <p className="fs-3 fw-bold">{user.name}</p>
            </span>
          </div>

          <div className="col">
            <span className="fs-5">
              User Name:
              <p className="fs-3 fw-bold">{user.user_name}</p>
            </span>
          </div>

          <div className="col">
            <span className="fs-5">
              Email:
              <p className="fs-3 fw-bold">{user.email}</p>
            </span>
          </div>

          <div className="col">
            <span className="fs-5">
              Password:
              <p className="fs-3 fw-bold">{"*".repeat(8)}</p>
            </span>
          </div>

          <div className="col">
            <span className="fs-5">
              Telephone:
              <p className="fs-3 fw-bold">{user.telephone}</p>
            </span>
          </div>
        </div>

        <div className="col-12">
          <div className="d-grid gap-2 d-md-flex mt-4 justify-content-center">
            <Link to={`/edit-user/${user.id}`} className="btn btn-primary me-md-2" type="button">
              Edit
            </Link>
            <button onClick={()=>deleteUser()}className="btn btn-danger" type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserIndex;
