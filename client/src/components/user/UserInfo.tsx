import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtainUserInfo, obtainUserOrders, obtainUserPayment as obtainUserPayments } from "../../store/actions/userActions";
import { IOrders, IPaymentMethod, IUser, UserState } from "../../types";
import UserBottom from "../ui/UserInfoBottom";
import UserMid from "../ui/UserInfoMid";
import UserTop from "../ui/UserInfoTop";

const UserInfo = () => {

  //* Global user from Redux store
  const user: IUser = useSelector((state: UserState) => state.user);

  //* Global orders from store
  const orders: IOrders[] = useSelector((state: UserState) => state.orders);

  //* Global payment methods from store
  const payments: IPaymentMethod[] = useSelector((state: UserState) => state.payments);

  //* Dispatch to call actions
  const dispatch = useDispatch();

  //* useEffect to load info
  useEffect(()=> {
    if(Object.keys(user).length === 0 ) {
      dispatch( obtainUserInfo( 1 ) );
      dispatch( obtainUserOrders( 1) );
      dispatch( obtainUserPayments( 1) );
    } 
  });

  return (
    <Fragment>
      <UserTop name={user.name} />
      <UserMid user={user}>
        <UserBottom orders={orders} payments={payments} />
      </UserMid>
    </Fragment>
  );
};

export default UserInfo;
