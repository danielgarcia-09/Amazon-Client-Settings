import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";
import {
  obtainUserOrders,
  obtainUserPayment as obtainUserPayments,
} from "../../store/actions/userActions";
import { IOrders, IPaymentMethod, IUser, UserState } from "../../types";
import Navbar from "../ui/Navbar";

const UserInfo = () => {
  //* Router navigate
  let navigate = useNavigate();

  //* Global Redux store
  const {token, user, isAuth, orders, payments} = useSelector((state: UserState) => state);

  //* Dispatch to call actions
  const dispatch = useDispatch();

  //* useEffect to load info
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if( user && isAuth && token ) {
      dispatch( obtainUserOrders(user.id) )
      dispatch( obtainUserPayments(user.id) )
    }

  }, [isAuth]);

  console.log(axiosClient.defaults.headers.common);

  return (
    <Fragment>
        <Navbar/>
    </Fragment>
  );
};

export default UserInfo;
