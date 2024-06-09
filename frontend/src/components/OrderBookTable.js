import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAsync } from "../Redux/Slices/OrderSlice";

const OrderBookTable = ({ orderDataFromRedux }) => {
  const dispatch = useDispatch();
  const orderRedux = useSelector((state) => state.order);
  // console.log(sorted);

  function sortOrderBook(apiData, type) {
    try {
      let data;

      if (type === "BUY") {
        data = Object.values(apiData).sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (type === "SELL") {
        data = Object.values(apiData).sort((a, b) => {
          return a.price - b.price;
        });
      }

      return data;
    } catch (error) {
      console.log("sortDataInAsc Error - ", error.message);
    }
  }

  function orderMatchingAlgorithm(orderBook) {
    try {
      const buyerData = sortOrderBook(orderBook, "BUY").filter((data) => {
        return data.type === "BUY";
      });

      const sellerData = sortOrderBook(orderBook, "SELL").filter((data) => {
        return data.type === "SELL";
      });

      let buyOrderI = 0;
      let sellOrderI = 0;

      while (buyOrderI < buyerData.length && sellOrderI < sellerData.length) {
        const buyFirstEntry = buyerData[buyOrderI];
        const sellFirstEntry = sellerData[sellOrderI];

        if (buyFirstEntry.price >= sellFirstEntry.price) {
          console.log(
            `Order Matching ${buyFirstEntry.price} ${sellFirstEntry.price}`
          );
          // Implement your logic to update the database here

          // Move to the next buy and sell orders
          buyOrderI++;
          sellOrderI++;
        } else {
          console.log(
            `Not Matching ${buyFirstEntry.price} ${sellFirstEntry.price}`
          );
          // Move only the buy order index forward as we need a higher price to match
          buyOrderI++;
        }
      }
    } catch (error) {
      console.log("orderMatchingAlgorithm Error - ", error.message);
    }
  }

  useEffect(() => {
    if (orderDataFromRedux) {
      orderMatchingAlgorithm(orderDataFromRedux);
    }
  }, [orderDataFromRedux]);

  return (
    <>
      {(function () {
        try {
          return (
            <div className="col-12 row">
              <div className="col-12 col-md-6">
                <div className="p-2" style={{ backgroundColor: "#2cc525" }}>
                  <h6 className="text-bold text-center">BUY</h6>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortOrderBook(
                        orderDataFromRedux && orderDataFromRedux,
                        "BUY"
                      ).map((data, index) => {
                        if (data.type === "BUY") {
                          return (
                            <tr key={index}>
                              <td>{data.qty}</td>
                              <td>&#8377; {data.price}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="p-2" style={{ backgroundColor: "#ff5050" }}>
                  <h6 className="text-bold text-center">SELL</h6>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortOrderBook(
                        orderDataFromRedux && orderDataFromRedux,
                        "SELL"
                      ).map((data, index) => {
                        if (data.type === "SELL") {
                          return (
                            <tr key={index}>
                              <td>{data.qty}</td>
                              <td>&#8377; {data.price}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        } catch (error) {
          console.log("OrderBookTable.js Error - ", error.message);
        }
      })()}
    </>
  );
};

export default OrderBookTable;
