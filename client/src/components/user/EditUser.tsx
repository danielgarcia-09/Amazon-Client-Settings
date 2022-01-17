import { compare, hash } from "bcryptjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUserInfo } from "../../store/actions/userActions";
import { IUser, UserState } from "../../types";
import FormBlock from "../ui/FormBlock";
import InputError from "../ui/InputError";
import {Form, MainSection} from "../ui/Sections";

const EditUser = () => {
  //* Global user
  const user: IUser = useSelector((state: UserState) => state.user);

  //* Dispatch
  const dispatch = useDispatch();

  //* Router params
  let params = useParams();

  //* Router navigation
  let navigate = useNavigate();

  //* state
  const [newUser, setNewUser] = useState({
    ...user,
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  //* Error password state
  const [ errorPwd, setErrorPwd ] = useState('');

  //* Extracting values from state
  const {
    id,
    name,
    user_name,
    password,
    old_password,
    new_password,
    confirm_password,
    email,
    address,
    telephone,
  } = newUser;

  //* Handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  //* To check for empty values
  const isFalse = Object.values(newUser).some(value => {
    if (!value || value === '') {
      return true;
    }
  
    return false;
  });

  //* Handling submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ( isFalse ) {
      console.error('tan vacio mamaguebo')
      return;
    }
    
    if (new_password !== confirm_password) return;

    const comparePassword = await compare(old_password, String(password));

    if (!comparePassword) {
      setErrorPwd('Contraseña nueva no coincide con la anterior')
      return;
    }

    const newUser: IUser = {
      id,
      name,
      user_name,
      password: await hash(new_password, 10),
      email,
      address,
      telephone,
    };

    //* Deleting before state
    localStorage.removeItem('state');

    //* After all verifications we update the user
    dispatch(editUserInfo(newUser));

    //* After submit navigate to index
    navigate("/");
  };

  return (
    <MainSection>
      <h1>Edit Account</h1>

      <Form onSubmit={handleSubmit}>
        <div>
          <FormBlock>
            <label htmlFor="user_name">User Name</label>
            <input
              type={"text"}
              name="user_name"
              onChange={handleChange}
              value={user_name}
            />
            <InputError active={!user_name} message="Must fill this field" />
          </FormBlock>

          <FormBlock>
            <label htmlFor="old_password">Old Password</label>
            <input
              type={"password"}
              name="old_password"
              onChange={handleChange}
              value={old_password}
            />
            <InputError active={!old_password} message={"Must fill this field"} />
            <InputError active={!!errorPwd} message={errorPwd} />
          </FormBlock>

          <FormBlock>
            <label htmlFor="new_password">New Password</label>
            <input
              type={"password"}
              name="new_password"
              onChange={handleChange}
              value={new_password}
            />
            <InputError active={new_password !== confirm_password} message="Not same password" />
          </FormBlock>

          <FormBlock>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type={"password"}
              name="confirm_password"
              onChange={handleChange}
              value={confirm_password}
            />
            <InputError active={!confirm_password || confirm_password !== new_password} message="Not same password" />
          </FormBlock>

          <FormBlock>
            <label htmlFor="address">Address</label>
            <input
              type={"text"}
              name="address"
              onChange={handleChange}
              value={address}
            />
            <InputError active={!address} message="Must fill this field" />
          </FormBlock>

          <FormBlock>
            <label htmlFor="telephone">Telephone</label>
            <input
              type={"text"}
              name="telephone"
              onChange={handleChange}
              value={telephone}
            />
            <InputError active={!telephone} message="Debes llenar este campo" />
          </FormBlock>
        </div>

        <button className="main" type="submit">Save</button>
      </Form>
    </MainSection>
  );
};

export default EditUser;
