import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../../types";
import { deleteOrderAction } from "../../store/actions/userActions";
import Layout from "../ui/Layout";
import styled from "@emotion/styled";
import { useEffect } from "react";

const DashedCard = styled.div`
  max-width: 300px;
  border: 6px dashed gray;
  text-align: center;
  line-height: inherit;
  font-size: 8rem;

  a {
    margin-top: -10px
    position: relative;
    text-decoration: none !important;
    color: gray;
  }

  a > span {
    position: absolute;
    top: 65%;
    right: 37%;
    font-size: 1rem;
  }
`;

const Orders = () => {
  //* Global Orders
  const {isAuth, orders} = useSelector((state: UserState) => state);

   //* Navigation
   let navigate = useNavigate();

   //* Check if auth
   useEffect(() => {
     if (!isAuth) {
       navigate("/");
     }
   }, [isAuth]);

  //* Dispatch for actions
  const dispatch = useDispatch();

  const deleteOrder = (id: number) => {
    dispatch( deleteOrderAction(id));
  };

  return (
    <Layout>
      <h1 className="text-center mt-5">Orders</h1>
      <div className="container py-5 px-1 mx-auto">
        <div className="row justify-content-between justify-content-sm-center">
          <DashedCard className="card col-sm-6 p-0 m-3">
            <Link to={"/new-order"}>
              +
              <br />
              <span>New Order</span>
              </Link>
          </DashedCard>

          {orders.map((order) =>
              <div
                className="card col-sm-6 p-0 border-primary m-3"
                style={{ maxWidth: "300px" }}
                key={order.order_id}
              >
                <div className="card-header fw-bold">{order.manufacturer}</div>
                <div className="card-body">
                  <h5 className="card-title">
                    {order.name}
                  </h5>
                  <p className="card-text fw-bold">${order.price}</p>
                  <p className="card-text">
                    <span className="fw-bold">{order.rating} stars</span>{" "}
                  </p>
                  <p className="card-text">
                      {order.item_info}
                  </p>
                </div>
                <div className="card-bottom text-center">
                    <Link
                      to={`/edit-payment/${order.order_id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      onClick={() => deleteOrder(Number(order.order_id))}
                      className="btn btn-danger ms-2"
                    >
                      Delete
                    </a>
                  </div>
              </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
