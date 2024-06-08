import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderAsync,
  getAllOrdersAsync,
} from "../Redux/Slices/OrderSlice";
import { toast } from "react-toastify";

const PlaceOrder = ({ setisLoading }) => {
  const dispatch = useDispatch();
  const orderRedux = useSelector((state) => state.order);

  //   console.log(orderRedux);

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, []);

  async function handlePlaceOrder(event) {
    setisLoading(true);
    event.preventDefault();

    const orderPrice = event.target.orderPrice.value;
    const orderQty = event.target.orderQty.value;
    const orderType = event.target.orderType.value;

    // console.log(orderPrice);
    // console.log(orderQty);
    // console.log(orderType);
    const actionResult = await dispatch(
      createOrderAsync({
        orderPrice,
        orderQty,
        orderType,
      })
    );

    if (actionResult.payload.msg === "Order Created") {
      toast.success(actionResult.payload.msg);
      event.target.orderPrice.value = "";
      event.target.orderQty.value = "";
      setisLoading(false);
    }

    if (actionResult.payload.msg === "Order Appended") {
      toast.success(actionResult.payload.msg);
      event.target.orderPrice.value = "";
      event.target.orderQty.value = "";
      setisLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handlePlaceOrder}>
        <div className="row">
          <div className="mb-3 col-12 col-md-4">
            <label htmlFor="orderPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              min={1}
              required
              className="form-control"
              id="orderPrice"
              name="orderPrice"
            />
          </div>

          <div className="mb-3  col-12 col-md-4 ">
            <label htmlFor="orderQty" className="form-label">
              Qty
            </label>
            <input
              type="number"
              min={1}
              className="form-control"
              required
              name="orderQty"
              id="orderQty"
            />
          </div>

          <div className="col-12 col-md-4  d-flex flex-row justify-content-around">
            <select
              className="form-select"
              required
              id="orderType"
              name="orderType"
              style={{ width: "200px" }}
            >
              <option>Select Option</option>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>

            <button title="Place Your Order" className="btn btn-primary">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
