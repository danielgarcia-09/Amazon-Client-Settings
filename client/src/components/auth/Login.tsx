import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import storage from "redux-persist/lib/storage";
import { LoginUser } from "../../store/actions/userActions";
import { UserState } from "../../types";

const LoginForm = styled.form`
  margin: 5rem auto;
  width: 50%;
`;

const Login = () => {
  //* Navigator
  const navigate = useNavigate();

  //* Login state
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //* Error state
  const [error, setError] = useState(false);

  //* Extracting values from state
  const { email, password } = user;

  //* Login error message from store
  const { isAuth, loginError } = useSelector((state: UserState) => state);

  //* To check if isAuth
  useEffect(() => {
    if (isAuth) {
      navigate("/user");
    }
    if (loginError) {
      storage.removeItem("persist:root");
    }
  }, [isAuth, loginError]);

  //* Dispatch to call actions
  const dispatch = useDispatch();

  //* Handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //* Handling submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Check for empty values
    if (email.trim() === "" || password.trim() === "") {
      setError(true);
      return;
    }

    dispatch(LoginUser(email, password));
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h1 className="text-center">Login</h1>
      <div className="form-group my-4">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-danger">
          {loginError}
        </small>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
        />
      </div>
      <span>
        <Link to={"new-user"}>Create a new account</Link>
      </span>

      <div className="d-grid gap-1">
        <button type="submit" className="mt-4 btn btn-lg btn-primary">
          Login
        </button>
      </div>
    </LoginForm>
  );
};

export default Login;
