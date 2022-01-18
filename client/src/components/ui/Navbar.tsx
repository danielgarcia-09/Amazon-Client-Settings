import "bootstrap/dist/js/bootstrap.min.js";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOff } from "../../store/actions/userActions";
import { UserState } from "../../types";

const Navbar = () => {

  //* Redux store
  const {user, isAuth} = useSelector((state: UserState) => state);

  //* Dispatch
  const dispatch = useDispatch();

  //* Sign off
  const signOut = () => {
    dispatch( signOff() );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Solvex Test
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>
          {isAuth ? (
            <Fragment>
              <span className="navbar-text">
                <Link className="nav-link" to={"user-info"}>
                  {user.name}
                </Link>
              </span>
              <span className="navbar-text">
                <a className="nav-link" onClick={()=> signOut()} href="#">Sign Out</a>
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <span className="navbar-text">
                <a className="nav-link" href="#">
                  Login
                </a>
              </span>
              <span className="navbar-text">
                <a className="nav-link" href="#">
                  Sign Up
                </a>
              </span>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
