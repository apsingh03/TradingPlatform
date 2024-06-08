import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAsync } from "../Redux/Slices/OrderSlice";

const PendingTable = ({ orderDataFromRedux }) => {
  const dispatch = useDispatch();
  const orderRedux = useSelector((state) => state.order);
  // console.log(sorted);

  function sortDataInAsc(apiData) {
    const data = Object.values(apiData).sort((a, b) => {
      return a.price - b.price;
    });

    return data;
  }

  return (
    <>
      <div className="col-12 row">
        <div className="col-12 col-md-6">
          <div className="p-2" style={{ backgroundColor: "#a3b2bd" }}>
            <p className="text-bold text-center">BUY</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {sortDataInAsc(orderDataFromRedux && orderDataFromRedux).map(
                  (data, index) => {
                    if (data.type === "BUY") {
                      return (
                        <tr key={index}>
                          <td>{data.qty}</td>
                          <td>&#8377; {data.price}</td>
                        </tr>
                      );
                    }
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-2" style={{ backgroundColor: "#a3b2bd" }}>
            <p className="text-bold text-center">SELL</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {sortDataInAsc(orderDataFromRedux && orderDataFromRedux).map(
                  (data, index) => {
                    if (data.type === "SELL") {
                      return (
                        <tr key={index}>
                          <td>{data.qty}</td>
                          <td>&#8377; {data.price}</td>
                        </tr>
                      );
                    }
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingTable;
