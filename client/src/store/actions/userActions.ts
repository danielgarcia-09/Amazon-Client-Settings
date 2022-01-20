import { AnyAction, Dispatch } from "redux";
import storage from "redux-persist/lib/storage";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/token";
import { IAddress, IOrders, IPaymentMethod, IUser } from "../../types";
import {
  CREATE_USER_PAYMENT,
  DELETE_USER,
  DELETE_USER_PAYMENT,
  EDIT_USER_PAYMENT,
  GET_USER,
  GET_USER_ORDERS,
  GET_USER_PAYMENTS,
  LOGIN_ERROR,
  SIGN_OFF_USER,
  EDIT_USER_INFO,
  USER_AUTENTICATED,
  USER_CREATED,
  CREATE_USER_ORDER,
  CREATE_ADDRESS,
  EDIT_ADDRESS,
  GET_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ORDER,
  DELETE_ORDER,
} from "./actionTypes";
import { Alert, AlertCanceled, AlertSuccess } from "../../config/alerts";

export function createUser(user: IUser) {
  return async (dispatch: Dispatch) => {
    try {
      const insert = await axiosClient.post("/user", { user });

      if (insert.data.changes === 1) {
        dispatch({
          type: USER_CREATED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function LoginUserAction(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.post("/auth", { email, password });
      
      dispatch(userAuthenticated(result.data.token));

      const token = localStorage.getItem("token");

      if (token) {
        tokenAuth(token);
      }
      const user = await getAuthUserAction();

      dispatch({
        type: GET_USER,
        payload: user,
      });
    } catch (error: any) {
      dispatch(loginError(error.response.data.error.message));
      return;
    }
  };
}

const userAuthenticated = (token: string): AnyAction => ({
  type: USER_AUTENTICATED,
  payload: token,
});

const getAuthUserAction = async () => {
  try {
    const result = await axiosClient.get("/auth");
    const user: IUser = result.data;

    return user;
  } catch (error: any) {
    console.log(error.response.data.error.message);
  }
};

const loginError = (msj: string): AnyAction => ({
  type: LOGIN_ERROR,
  payload: msj,
});

export function signOffAction() {
  return (dispatch: Dispatch) => {
    localStorage.removeItem("token");
    storage.removeItem("persist:root");

    dispatch({
      type: SIGN_OFF_USER,
    });
  };
}

export function editUserAction(user: IUser) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.put(`/auth/${user.id}`, { user });

      dispatch(updateUserInfo(result.data.user));
    } catch (error: any) {
      console.error(error.response);
      return;
    }
  };
}

const updateUserInfo = (user: IUser): AnyAction => ({
  type: EDIT_USER_INFO,
  payload: user,
});

export function deleteUserAction(id: number) {
  return async (dispatch: Dispatch) => {
    const verify = await Alert("Do you really want to delete your user?");

    if (verify.isConfirmed) {
      try {
        const result = await axiosClient.delete(`/auth/${id}`);

        if (result.data.changes === 1) {
          AlertSuccess();
          dispatch(userDeleted());
        }

        return;
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      AlertCanceled();
      return;
    }
  };
}
const userDeleted = (): AnyAction => ({
  type: DELETE_USER,
});
// * **********************************************************************************

export function obtainUserOrders(id: number | undefined, limit: number = 3) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.get(`/orders/${id}?limit=${limit}`);

      const { orders } = result.data;

      dispatch(getUserOrders(orders));
    } catch (error: any) {
      // console.error(error.response.data.error.message);
      return;
    }
  };
}

const getUserOrders = (orders: IOrders[]): AnyAction => ({
  type: GET_USER_ORDERS,
  payload: orders,
});

export function createOrderAction(user_id: number, order: IOrders) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.post(`/orders/${user_id}`, { order });
      const { changes, lastInsertRowid } = result.data;
      if (changes === 1) dispatch(createOrder({order_id:lastInsertRowid,  ...order}));

      return;
    } catch (error) {
      return;
    }
  };
}
const createOrder = (order: IOrders): AnyAction => ({
  type: CREATE_USER_ORDER,
  payload: order,
});

export function editOrdersAction(order: IOrders) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.put(`/order/${order.order_id}`, {
        order
      });
      if (result.data.changes === 1) {
        dispatch(editOrder(order));
      } else {
        return;
      }
    } catch (error: any) {
      console.error(error.response.error.message);
      return;
    }
  };
}
const editOrder = (order: IOrders): AnyAction => ({
  type: EDIT_ORDER,
  payload: order,
});

export function deleteOrderAction(id: number) {
  return async (dispatch: Dispatch) => {
    const verify = await Alert("Do you really want to delete this?");

    if (verify.isConfirmed) {
      try {
        const result = await axiosClient.delete(`/orders/${id}`);

        if (result.data.changes === 1) {
          AlertSuccess();
          dispatch(deleteOrder(id));
        } else {
          return;
        }
      } catch (error: any) {
        console.error(error.response.data.error.message);
        return;
      }
    } else {
      return;
    }
  };
}

const deleteOrder = (id: number): AnyAction => ({
  type: DELETE_ORDER,
  payload: id,
});

//* *****************************************************************************

export function obtainUserPayment(id: number | undefined, limit: number = 3) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.get(`/payments/${id}?limit=${limit}`);

      const { payments } = result.data;

      dispatch(getUserPayments(payments));
    } catch (error: any) {
      // console.error(error.response.data.error.message);
      return;
    }
  };
}
const getUserPayments = (payments: IPaymentMethod[]): AnyAction => ({
  type: GET_USER_PAYMENTS,
  payload: payments,
});

export function createUserPayment(payment: IPaymentMethod) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.post("/payments", {
        payment_method: payment,
      });
      const { lastInsertRowid } = result.data;

      AlertSuccess();
      dispatch(postUserPayment({ id: lastInsertRowid, ...payment }));
    } catch (error: any) {
      // console.error(error.response.data.error.message);
      return;
    }
  };
}

const postUserPayment = (payment: IPaymentMethod): AnyAction => ({
  type: CREATE_USER_PAYMENT,
  payload: payment,
});

export function editUserPaymentAction(payment: IPaymentMethod) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.put(`/payment/${payment.id}`, {
        payment_method: payment,
      });
      if (result.data.changes === 1) {
        dispatch(editUserPayment(payment));
      } else {
        return;
      }
    } catch (error: any) {
      console.error(error.response.error.message);
      return;
    }
  };
}
const editUserPayment = (payment: IPaymentMethod): AnyAction => ({
  type: EDIT_USER_PAYMENT,
  payload: payment,
});
export function deleteUserPayment(id: number) {
  return async (dispatch: Dispatch) => {
    const verify = await Alert("Do you really want to delete this?");

    if (verify.isConfirmed) {
      try {
        const result = await axiosClient.delete(`/payment/${id}`);

        if (result.data.changes === 1) {
          AlertSuccess();
          dispatch(deletePayment(id));
        } else {
          return;
        }
      } catch (error: any) {
        console.error(error.response.data.error.message);
        return;
      }
    } else {
      return;
    }
  };
}

const deletePayment = (id: number): AnyAction => ({
  type: DELETE_USER_PAYMENT,
  payload: id,
});

//* ***************************************************************************

export function getAddress(id: number | undefined) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.get(`/address/${id}`);

      const { adresses } = result.data;

      dispatch(getAddresses(adresses));
    } catch (error: any) {
      // console.error(error.response.data.error.message);
      return;
    }
  };
}

const getAddresses = (adresses: IAddress[]): AnyAction => ({
  type: GET_ADDRESS,
  payload: adresses,
});

export function createAddressAction(address: IAddress) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.post("/address", { address });
      const { changes, lastInsertRowId } = result.data;
      if (changes === 1) {
        dispatch(createAddress( {id: lastInsertRowId, ...address}));
        AlertSuccess();
      } else {
        return;
      }
    } catch (error) {
      return;
    }
  };
}
const createAddress = (address: IAddress): AnyAction => ({
  type: CREATE_ADDRESS,
  payload: address,
});

export function editAddressAction(address: IAddress) {
  return async (dispatch: Dispatch) => {
    try {
      const result = await axiosClient.put(`/address/${address.id}`, {
       address
      });
      if (result.data.changes === 1) {
        dispatch(editAddress(address));
      } else {
        return;
      }
    } catch (error: any) {
      console.error(error.response.error.message);
      return;
    }
  };
}
const editAddress = (address: IAddress): AnyAction => ({
  type: EDIT_ADDRESS,
  payload: address,
});

export function deleteAddressAction(id: number) {
  return async (dispatch: Dispatch) => {
    const verify = await Alert("Do you really want to delete this?");

    if (verify.isConfirmed) {
      try {
        const result = await axiosClient.delete(`/address/${id}`);

        if (result.data.changes === 1) {
          AlertSuccess();
          dispatch(deleteAddress(id));
        } else {
          return;
        }
      } catch (error: any) {
        console.error(error.response.data.error.message);
        return;
      }
    } else {
      return;
    }
  };
}

const deleteAddress = (id: number): AnyAction => ({
  type: DELETE_ADDRESS,
  payload: id,
});