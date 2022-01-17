import { AnyAction } from "redux";
import { UserState } from "../../types";
import { CREATE_USER_PAYMENT, DELETE_USER_PAYMENT, GET_USER_INFO, GET_USER_ORDERS, GET_USER_PAYMENTS, UPDATE_USER_INFO } from "../actions/actionTypes";

const initialState: UserState  = {
    user: {},
    orders: [],
    payments: []
};

export default function userReducer( state: UserState = initialState, action: AnyAction): UserState {
    switch(action.type) {
        case UPDATE_USER_INFO:
        case GET_USER_INFO: {
            return {
                ...state,
                user: action.payload
            }
        }
        

        case GET_USER_ORDERS: {
            return {
                ...state,
                orders: action.payload
            }
        }

        case GET_USER_PAYMENTS: {
            return {
                ...state,
                payments: action.payload
            }
        }

        case CREATE_USER_PAYMENT: {
            return {
                ...state,
                payments: [action.payload,...state.payments]
            }
        }

        case DELETE_USER_PAYMENT: {
            return {
                ...state,
                payments: state.payments.filter( p => p.id !== action.payload)
            }
        }

        default: {
            return state;
        }
    }
}