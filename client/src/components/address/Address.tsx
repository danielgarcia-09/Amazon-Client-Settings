import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../../types";
import { deleteAddressAction, getAddress } from "../../store/actions/userActions";
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
    right: 32%;
    font-size: 1rem;
  }
`;

const Address = () => {
  //* Global payments
  const { user, isAuth,token, adresses } = useSelector((state: UserState) => state);

  //* Navigation
  let navigate = useNavigate();

  //* Check if auth
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if( adresses.length === 0) {
      dispatch( getAddress(user.id) );
    }
  }, [adresses,token, isAuth]);

  //* Dispatch for actions
  const dispatch = useDispatch();

  const deleteAddress = (id: number) => {
    dispatch( deleteAddressAction(id) );
  };

  return (
    <Layout>
      <h1 className="text-center mt-5">Address</h1>
      <div className="container py-5 px-1 mx-auto">
        <div className="row justify-content-between justify-content-sm-center">
          <DashedCard key={9999} className="card col-sm-6 p-0 m-3">
            <Link to={"/new-address"}>
              +
              <br />
              <span>New address</span>
            </Link>
          </DashedCard>

          {adresses.map((address) => (
            <div
              className="card col-sm-6 p-0 border-dark m-3"
              style={{ maxWidth: "300px" }}
              key={address.id}
            >
              <div className="card-header fw-bold">{address.zip_code}</div>
              <div className="card-body">
                <h5 className="card-title">
                  {address.address1}
                </h5>
                <p className="card-text">
                  {address.address2}
                </p>
                <div className="text-center">
                  <Link
                    to={`/edit-address/${address.id}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    onClick={() => deleteAddress(Number(address.id))}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Address;
