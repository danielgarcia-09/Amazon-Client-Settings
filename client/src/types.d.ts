export interface IPaymentMethod {
    id?: number,
    user_id?: number,
    company?: string,
    card_number?: string,
    valid_until?: string,
    cvv?: number 
}

export interface IOrders {
    order_id: number,
    user_id: number,
    name: string,
    price: number,
    rating: number,
    manufacturer: string,
    item_info? : string
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
    address?: string,
    telephone?: string
}
export type UserState = {
    user: IUser,
    orders: IOrders[],
    payments: IPaymentMethod[]
}