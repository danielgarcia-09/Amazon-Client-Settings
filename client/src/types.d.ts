export interface IPaymentMethod {
    id?: number,
    user_id?: number,
    company?: string,
    card_number?: string,
    valid_until?: string,
    cvv?: number 
}
export interface IAddress {
    id?: number,
    user_id?: number,
    address1?: string,
    address2?: string,
    zip_code?: string,
}

export interface IOrders {
    order_id?: number,
    user_id?: number,
    address_id?: number,
    name?: string,
    price?: number,
    rating?: number,
    manufacturer?: string,
    item_info? : string,
    quantity?: number
}

export interface IMessages {
    id: number,
    message_id: string
    sender: string,
    receiver: string,
    message: string,
}

export interface IUser {
    id?: number,
    name?: string,
    user_name?: string,
    password?: string,
    email?: string,
    telephone?: string,
    role?: string,
}
export type UserState = {
    user: IUser,
    token: string | null,
    isAuth: boolean,
    loginError: string | null,
    orders: IOrders[],
    payments: IPaymentMethod[],
    adresses: IAddress[],
    loading: boolean
}