import { AnyAction, Dispatch } from "redux";
import axiosClient from "../../config/axios";
import { IOrders, IPaymentMethod, IUser } from "../../types";
import { CREATE_USER_PAYMENT, DELETE_USER_PAYMENT, GET_USER_INFO, GET_USER_ORDERS, GET_USER_PAYMENTS, UPDATE_USER_INFO } from "./actionTypes";

export function obtainUserInfo( id: number ) {
    return async (dispatch: Dispatch) => {

        try {
            const result = await axiosClient.get(`/user/${id}`);
            
            const { user } = result.data;

            dispatch( getUserInfo(user) ); 

        } catch (error) {
            console.error(error);
            return;
        }
    }
}

export function editUserInfo ( user: IUser ) {
    return async (dispatch: Dispatch) => {
        try {
            const result = await axiosClient.put(`/user/${user.id}`, {user});
            
            dispatch( updateUserInfo( result.data.user ) );
        } catch (error) {
            console.error(error);
            return;
        }
    }
}

const getUserInfo = ( user: IUser ): AnyAction => ({
    type: GET_USER_INFO,
    payload: user
})

const updateUserInfo = ( user: IUser ): AnyAction => ({
    type: UPDATE_USER_INFO,
    payload: user
})

export function obtainUserOrders ( id: number, limit : number = 3 ) {
    return async ( dispatch: Dispatch ) => {
        try {
            const result = await axiosClient.get(`/orders/${id}?limit=${limit}`);
            
            const { orders } = result.data;

            dispatch( getUserOrders( orders ) );
        } catch (error) {
            console.error(error);
            return;
        }
    }
}

const getUserOrders = ( orders: IOrders[] ): AnyAction => ({
    type: GET_USER_ORDERS,
    payload: orders
})

export function obtainUserPayment ( id: number, limit: number = 3 ) {
    return async ( dispatch: Dispatch ) => {
        try {
            const result = await axiosClient.get(`/payments/${id}?limit=${limit}`);
            
            const { payments } = result.data;

            dispatch( getUserPayments( payments ) );
        } catch (error) {
            console.error(error);
            return;
        }
    }
}

const getUserPayments = ( payments: IPaymentMethod[] ): AnyAction => ({
    type: GET_USER_PAYMENTS,
    payload: payments
})

export function createUserPayment ( payment: IPaymentMethod ) {
    return async (dispatch: Dispatch) => {
        try {
            const result = await axiosClient.post('/payments', {payment_method: payment});
            const { lastInsertRowid } = result.data;

            dispatch( postUserPayment( {id: lastInsertRowid, ...payment} ) );
        } catch (error) {
            console.error(error);
            return;
        }
    }
}

const postUserPayment = ( payment: IPaymentMethod ): AnyAction => ({
    type: CREATE_USER_PAYMENT,
    payload: payment
})

export function deleteUserPayment ( id: number ) {
    return async ( dispatch: Dispatch ) => {
        try {
            const result = await axiosClient.delete(`/payment/${id}`);
            console.log(result);
            dispatch( deletePayment( id ) );
        } catch (error) {
            console.error(error);
            return;
        }
    }
}

const deletePayment = ( id: number ): AnyAction => ({
    type: DELETE_USER_PAYMENT,
    payload: id
})