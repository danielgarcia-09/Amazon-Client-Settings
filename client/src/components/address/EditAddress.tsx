import React, { useEffect, useState } from "react";
import { IAddress, UserState } from "../../types";
import Layout from "../ui/Layout";
import InputError from "../ui/InputError";
import { useDispatch, useSelector } from "react-redux";
import { editAddressAction } from "../../store/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "../../config/isEmpty";

const EditAddress = () => {
  //* Global address
  const { adresses, isAuth } = useSelector((state: UserState) => state);

  //* URL Params
  const params = useParams();

  //* Address to edit
  const edit = adresses.find((a) => a.id === Number(params.id));

  //* Check if auth
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  //* state
  const [editAddress, setEditAddress] = useState<IAddress>({...edit});

  //! error state
  const [error, setError] = useState(false);

  //* Extracting values
  const { address1, address2, zip_code } = editAddress;

  //* handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditAddress({
      ...editAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditAddress({
      ...editAddress,
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

    if (isEmpty(editAddress)) {
      setError(true);
      return;
    }

    setError(false);

    dispatch(editAddressAction(editAddress));

    navigate("/address");
  };

  return (
    <Layout>
      <div className="container px-5 my-5">
        <h1 className="text-center mb-4">Edit Address</h1>
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
              name="address2"
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
export default EditAddress;
