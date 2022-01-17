import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { IOrders, IPaymentMethod } from "../../types";
import OrdersTable from "./OrderStyles";
import {
  PaymentCompany,
  PaymentMethods,
  PaymentService,
} from "./PaymentStyles";

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 3fr));
  grid-gap: 40px;
  text-align: left !important;
  h1 {
    color: #636e63;
  }
`;

const OrderPayment = styled.div`
  grid-column: 1;
  grid-row: 1/3;
`;

const Messages = styled.div`
  max-height: 713px;
  padding: 2rem;
  background-color: #adc2a9;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;

  & > div {
    background-color: #d3e4cd;
    border-radius: 8px;
    padding: 2rem;
    margin-top: 1.2rem;
  }
`;

const newPaymentStyle: React.CSSProperties = {
  float: "right",
  marginLeft: '.5rem',
  lineHeight: "75px",
  fontSize: "3rem",
  textDecoration: "none",
};

type Props = {
  orders: IOrders[];
  payments: IPaymentMethod[];
};

const UserBottom = ({ orders, payments }: Props) => {
  return (
    <DataGrid>
      <OrderPayment>
        <h1>Recent Orders</h1>
        <OrdersTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.order_id}>
                  <td>{o.name}</td>
                  <td>{o.price} $USD</td>
                  <td>{o.rating} stars</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No orders</td>
                <td>No orders</td>
                <td>No orders</td>
              </tr>
            )}
          </tbody>
        </OrdersTable>

        <div style={{display: 'inline-block'}}>
          <Link style={{ float: "left" }} to={"/payments"}>
            <h1>Payment Methods</h1>
          </Link>
          <Link className="newProduct" style={newPaymentStyle} to="/new-payment">
            +
          </Link>
        </div>
        <PaymentMethods>
          {payments.map((payment) => (
            <PaymentService key={payment.id}>
              <PaymentCompany>{payment.company}</PaymentCompany>
              {payment.card_number}
            </PaymentService>
          ))}
        </PaymentMethods>
      </OrderPayment>

      <div>
        <h1>Messages</h1>
        <Messages>
        </Messages>
      </div>
    </DataGrid>
  );
};

export default UserBottom;
