import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../../types";
import { deleteUserPayment } from "../../store/actions/userActions";
import Layout from "../ui/Layout";
import styled from "@emotion/styled";

const DashedCard = styled.div`
  max-width: 300px;
  border: 6px dashed gray;
  text-align: center;
  line-height: inherit;
  font-size: 8rem;
  
  a {
    text-decoration: none !important;
    color: gray;
  }
  
`;

const Payments = () => {
  //* Global payments
  const payments = useSelector((state: UserState) => state.payments);

  //* Dispatch for actions
  const dispatch = useDispatch();

  const deletePayment = (id: number) => {
    dispatch(deleteUserPayment(id));
  };

  return (
    <Layout>
      <h1 className="text-center mt-5">Payment Methods</h1>
      <div className="container py-5 px-1 mx-auto">
        <div className="row justify-content-between justify-content-sm-center">
          <DashedCard className="card col-sm-6 p-0 m-3">
            <Link to={"/new-payment"}> + </Link>
          </DashedCard>

          {payments.map((payment) =>
            payment.company === "VISA" ? (
              <div
                className="card col-sm-6 p-0 border-primary m-3"
                style={{ maxWidth: "300px" }}
                key={payment.id}
              >
                <div className="card-header fw-bold">{payment.company}</div>
                <div className="card-body">
                  <h5 className="card-title">
                    {"**** **** **** " + payment.card_number?.substring(15)}
                  </h5>
                  <p className="card-text fw-bold">CVV: {payment.cvv}</p>
                  <p className="card-text">
                    EXP: <span className="fw-bold">{payment.valid_until}</span>{" "}
                  </p>
                  <div className="text-center">
                    <Link to={`/edit-payment/${payment.id}`}className="btn btn-primary">
                      Edit
                    </Link>
                    <a
                      href="#"
                      onClick={() => deletePayment(Number(payment.id))}
                      className="btn btn-danger ms-2"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="card col-sm-6 p-0 border-warning m-3"
                style={{ maxWidth: "300px" }}
                key={payment.id}
              >
                <div className="card-header fw-bold">{payment.company}</div>
                <div className="card-body">
                  <h5 className="card-title">
                    {"**** **** **** " + payment.card_number?.substring(15)}
                  </h5>
                  <p className="card-text fw-bold">CVV: {payment.cvv}</p>
                  <p className="card-text">
                    EXP: <span className="fw-bold">{payment.valid_until}</span>{" "}
                  </p>
                  <div className="text-center">
                    <a href="#" className="btn btn-primary">
                      Edit
                    </a>
                    <a
                      href="#"
                      onClick={() => deletePayment(Number(payment.id))}
                      className="btn btn-danger ms-2"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
