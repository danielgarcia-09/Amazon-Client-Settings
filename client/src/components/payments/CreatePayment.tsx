import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IPaymentMethod, UserState } from "../../types";
import FormBlock from "../ui/FormBlock";
import { Form, MainSection } from "../ui/Sections";
import { PaymentButtonBlock, PaymentSubmitButton } from "../ui/PaymentStyles";
import { createUserPayment } from "../../store/actions/userActions";

const CreatePayment = () => {
  //* Global user
  const user = useSelector((state: UserState) => state.user);

  //* Dispatch
  const dispatch = useDispatch();

  //* Router navigate
  let navigate = useNavigate();

  //* New Card state
  const [newCard, setNewCard] = useState<IPaymentMethod>({});

  //! Error state
  const [error, setError] = useState(false);

  //* Extracting values
  const { card_number, cvv, company, valid_until } = newCard;

  //* Handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value,
    });
  };

  //* To check for empty values
  const isFalse = Object.values(newCard).some((value) => {
    if (!value || value === "") {
      return true;
    }

    return false;
  });

  //* To check for empty object
  const isEmpty = Object.keys(newCard).length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    newCard.user_id = user.id;

    if (isEmpty || isFalse) {
      setError(true);
      return;
    }

    setError(false);

    //* Giving user's id to the new payment method
    newCard.user_id = user.id;

    //* Calling action dispatch
    dispatch(createUserPayment(newCard));

    //* after creating erase old state
    localStorage.removeItem("state");

    //* then navigate to index
    navigate("/");
  };

  const errorStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "-100px",
    marginBottom: "6rem",
    color: "white",
    padding: '1rem 3rem',
    backgroundColor: 'red'
  };

  return (
    <MainSection>
      <h1>Create Payment</h1>

      <Form onSubmit={handleSubmit}>
        <div>
          <FormBlock>
            <label htmlFor="card_number">Card Number</label>
            <input
              name="card_number"
              type={"text"}
              onChange={handleChange}
              value={card_number}
            />
          </FormBlock>

          <FormBlock>
            <label htmlFor="cvv">CVV</label>
            <input
              name="cvv"
              type={"number"}
              maxLength={3}
              onChange={handleChange}
              value={cvv}
            />
          </FormBlock>

          <FormBlock>
            <label htmlFor="valid_until">Valid Until</label>
            <input
              name="valid_until"
              type={"month"}
              onChange={handleChange}
              value={valid_until}
            />
          </FormBlock>

          <FormBlock>
            <label htmlFor="company">Company</label>
            <input
              name="company"
              type={"text"}
              onChange={handleChange}
              value={company}
            />
          </FormBlock>
        </div>

        <h1 style={errorStyle}>{error ? "Faltan datos" : null}</h1>
        <PaymentButtonBlock>
          <PaymentSubmitButton type="submit">Create</PaymentSubmitButton>
        </PaymentButtonBlock>
      </Form>
    </MainSection>
  );
};

export default CreatePayment;
