import React, { useEffect, useState } from "react";
import { IPaymentMethod, UserState } from "../../types";
import Layout from "../ui/Layout";
import InputMask from "react-input-mask";
import InputError from "../ui/InputError";
import { useDispatch, useSelector } from "react-redux";
import { createUserPayment, editUserPaymentAction } from "../../store/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const EditPayment = () => {

  //* Global array of  payments
  const { payments, isAuth } = useSelector((state: UserState) => state);

  //* URL Params
  let params = useParams();

  //* Payment to edit
  const edit = payments.find( p => p.id === params.id);

  //* Check if auth
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  //* state
  const [editPayment, setEditPayment] = useState({...edit});

  //! error state
  const [error, setError] = useState(false);

  //* Extracting values
  const { id, user_id, card_number, cvv, company, valid_until } = editPayment;

  //* handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPayment({
      ...editPayment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditPayment({
      ...editPayment,
      [e.target.name] : e.target.value
    })
  }

  //* Check for empty values
  const isEmpty = Object.values(editPayment).some((v) => {
    if (v === "") {
      return true;
    }
    return false;
  });

  //* Dispatch
  const dispatch = useDispatch();

  //* Navigate
  const navigate = useNavigate();

  //* handling submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty) {
      setError(true);
      return;
    }

    setError(false);

    const payload: IPaymentMethod = {
      id,
      user_id,
      card_number,
      cvv,
      company,
      valid_until,
    };

    dispatch( editUserPaymentAction(payload) );

    navigate("/payments");
  };

  return (
    <Layout>
      <div className="container px-5 my-5">
        <h1 className="text-center mb-4">Edit Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="card_number">
              Card Number
            </label>
            <InputMask
              mask={"9999-9999-9999-9999"}
              value={card_number}
              onChange={handleChange}
              className="form-control"
              name="card_number"
              placeholder="Card Number"
            >
              {(inputProps: any) => <input {...inputProps} type={"text"} />}
            </InputMask>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="cvv">
              CVV
            </label>
            <InputMask
              mask={"999"}
              value={cvv}
              onChange={handleChange}
              className="form-control"
              name="cvv"
              type="text"
              placeholder="CVV"
            >
              {(inputProps: any) => <input {...inputProps} type={"text"}/>}
            </InputMask>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="company">Company</label>
            <select className="form-select" value={company} onChange={handleSelect} name="company" aria-label="Company">
                <option value="">--------</option>
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
            </select>
        </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="valid_until">
              Valid Until
            </label>
            <input
              value={valid_until}
              onChange={handleChange}
              className="form-control"
              name="valid_until"
              type="month"
              placeholder="Valid Until"
            />
          </div>

          {error && (
            <InputError active={error} message="Must fill all fields" />
          )}
          <div className="d-grid mt-4">
            <button
              className="btn btn-primary btn-lg"
              name="submitButton"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default EditPayment;
