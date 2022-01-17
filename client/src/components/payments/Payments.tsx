import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../types";
import { MainSection } from "../ui/Sections";
import {
  PaymentCompany,
  PaymentDelete,
  PaymentMethods,
  PaymentService,
} from "../ui/PaymentStyles";
import { deleteUserPayment } from "../../store/actions/userActions";

const Payments = () => {
  //* Global payments
  const payments = useSelector((state: UserState) => state.payments);

  //* Dispatch for actions
  const dispatch = useDispatch();

  //* navigation router
  const navigate = useNavigate();

  const deletePayment = (id: number = 1) => {
    dispatch(deleteUserPayment(id));

    localStorage.removeItem("state");

    navigate("/");
  };

  return (
    <MainSection>
      <h1>Payment Methods</h1>
      <section className="payments">
        <PaymentMethods>
          {payments.map((payment) => (
            <PaymentService key={payment.id}>
              <PaymentCompany>{payment.company}</PaymentCompany>
              <PaymentDelete onClick={() => deletePayment(payment.id)}>
                X
              </PaymentDelete>

              <span>{payment.card_number}</span>
              <br />
              <p>Valid Until: {payment.valid_until}</p>
            </PaymentService>
          ))}
        </PaymentMethods>
      </section>
    </MainSection>
  );
};

export default Payments;
