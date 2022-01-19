import React, { useEffect, useState } from "react";
import { IOrders, UserState } from "../../types";
import Layout from "../ui/Layout";
import InputError from "../ui/InputError";
import { useDispatch, useSelector } from "react-redux";
import { editOrdersAction } from "../../store/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "../../config/isEmpty";

const EditOrder = () => {
  //* Global user
  const { user,orders, adresses, isAuth } = useSelector((state: UserState) => state);

    //* URL Params
    let params = useParams();

    //* Order to edit
    const edit = orders.find( o => o.order_id === Number(params.id));

  //* Check if auth
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  //* state
  const [editOrder, setEditOrder] = useState<IOrders>({...edit});

  //! error state
  const [error, setError] = useState(false);

  //* Extracting values
  const { name, rating, price, manufacturer, item_info, quantity, address_id } = editOrder;

  //* handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditOrder({
      ...editOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditOrder({
      ...editOrder,
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

    if (isEmpty(editOrder)) {
      setError(true);
      return;
    }

    setError(false);

    dispatch( editOrdersAction(editOrder));

    navigate("/orders");
  };

  return (
    <Layout>
      <div className="container px-5 my-5">
        <h1 className="text-center mb-4">Edit Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              onChange={handleChange}
              className="form-control"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="price">
              Price
            </label>
            <input
              value={price}
              onChange={handleChange}
              className="form-control"
              name="price"
              type="number"
              placeholder="Price"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="manufacturer">
              Manufacturer
            </label>
            <input
              value={manufacturer}
              onChange={handleChange}
              className="form-control"
              name="manufacturer"
              type="text"
              placeholder="Manufacturer"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              value={quantity}
              onChange={handleChange}
              className="form-control"
              name="quantity"
              type="number"
              min={1}
              max={10}
              placeholder="Quantity"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="rating">
              Rating
            </label>
            <input
              value={rating}
              onChange={handleChange}
              className="form-control"
              name="rating"
              type="number"
              min={1}
              max={10}
              placeholder="Rating"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="item_info">
              Info about order
            </label>
            <input
              value={item_info}
              onChange={handleChange}
              className="form-control"
              name="item_info"
              type="text"
              placeholder="Info"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="address_id">
              Address
            </label>
            <select
              value={address_id}
              onChange={handleSelect}
              className="form-control"
              name="address_id"
              placeholder="Address"
            >
                <option value={''}></option>
                {adresses.map( a => (
                    <option key={a.id} value={a.id}>{a.address1}</option>
                ))}
            </select>
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
export default EditOrder;
