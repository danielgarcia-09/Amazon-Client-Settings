import React, { useState } from "react";
import { IUser } from "../../types";
import Layout from "../ui/Layout";
import InputMask from "react-input-mask";
import InputError from "../ui/InputError";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const stateConfig: IUser = {
    id: undefined,
    name: "",
    email: "",
    telephone: "",
    user_name: "",
    password: "",
    role: "USER",
  };

  //* new user state
  const [newUser, setNewUser] = useState(stateConfig);

  //! error state
  const [ error, setError ] = useState(false);

  //* Extracting values
  const { email, name, telephone, user_name, password } = newUser;

  //* handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  //* Check for empty values
  const isEmpty = Object.values(newUser).some( v => {
    if( v === '') {
      return true;
    }
    return false;
  })

  //* Dispatch
  const dispatch = useDispatch();

  //* Navigate
  const navigate = useNavigate();

  //* handling submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if( isEmpty ) {
      setError(true);
      return;
    }

    setError(false);

    dispatch( createUser( newUser ) );

    navigate('/');
  };

  return (
    <Layout>
      <div className="container px-5 my-5">
        <h1 className="text-center mb-4">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={handleChange}
              className="form-control"
              name="email"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              onChange={handleChange}
              className="form-control"
              name="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="telephone">
              Telephone
            </label>
            <InputMask
              mask={"999-999-9999"}
              value={telephone}
              onChange={handleChange}
              className="form-control"
              name="telephone"
              type="text"
              placeholder="Telephone"
              required
            >
              {(inputProps: any) => <input {...inputProps} type={"tel"} />}
            </InputMask>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="user_name">
              User Name
            </label>
            <input
              value={user_name}
              onChange={handleChange}
              className="form-control"
              name="user_name"
              type="text"
              placeholder="User Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={handleChange}
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          
          {error && <InputError active={error} message="Must fill all fields" />}
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
export default NewUser;
