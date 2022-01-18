import React, { useEffect, useState } from "react";
import { IAddress, IOrders, UserState } from "../../types";
import Layout from "../ui/Layout";
import InputMask from "react-input-mask";
import InputError from "../ui/InputError";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../config/isEmpty";

const CreateAddress = () => {
  //* Global user
  const { user, isAuth } = useSelector((state: UserState) => state);

  //* initial state
  const stateConfig: IAddress = {
    user_id: user.id,
    address1: "",
    address2: "",
    zip_code: "",
  };

  //* Check if auth
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  //* state
  const [newAddress, setNewAddress] = useState<IAddress>(stateConfig);

  //! error state
  const [error, setError] = useState(false);

  //* Extracting values
  const { address1, address2, zip_code } = newAddress;

  //* handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  //* Dispatch
  const dispatch = useDispatch();

  //* Navigate
  const navigate = useNavigate();

  //* handling submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty(newAddress)) {
      setError(true);
      return;
    }

    setError(false);
    console.log(newAddress);

    // dispatch((newOrder));

    // navigate("/address");
  };

  return (
    <Layout>
      <div className="container px-5 my-5">
        <h1 className="text-center mb-4">Create Address</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="address1">
              Address 1
            </label>
            <textarea
              value={address1}
              onChange={handleTextarea}
              className="form-control"
              name="address1"
              placeholder="Address 1"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="address2">
              Address 2
            </label>
            <textarea
              value={address2}
              onChange={handleTextarea}
              className="form-control"
              name="address1"
              placeholder="Address 2"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="zip_code">
              Zip Code
            </label>
            <input
              value={zip_code}
              onChange={handleChange}
              className="form-control"
              name="zip_code"
              placeholder="Zip Code"
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
export default CreateAddress;
