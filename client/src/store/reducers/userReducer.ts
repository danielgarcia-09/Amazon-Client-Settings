import { AnyAction } from "redux";
import { UserState } from "../../types";
import { CREATE_USER_PAYMENT, DELETE_USER, DELETE_USER_PAYMENT,EDIT_USER_PAYMENT,GET_USER, GET_USER_ORDERS, GET_USER_PAYMENTS, LOGIN_ERROR, SIGN_OFF_USER, EDIT_USER_INFO, USER_AUTENTICATED } from "../actions/actionTypes";

const initialState: UserState  = {
    user: {},
    orders: [],
    payments: [],
    loginError: null,
    isAuth: false,
    token: localStorage.getItem('token'),
    loading: false,
};

export default function userReducer( state: UserState = initialState, action: AnyAction): UserState {
    switch(action.type) {
        case EDIT_USER_INFO:
        case GET_USER: {
            return {
                ...state,
                isAuth: true,
                user: action.payload,
                loading: false,
            }
        }
        
        case USER_AUTENTICATED: {
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                isAuth: true,
                loginError: null,
                token: action.payload,
                loading: true,
            }
        }

        case LOGIN_ERROR: {
            return {
                ...initialState,
                loginError: action.payload,
                token: null
            }
        }

        case DELETE_USER:
        case SIGN_OFF_USER: {
            return {
                ...initialState,
                token: null
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

        case EDIT_USER_PAYMENT:
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