import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PlaceOrder from "../components/PlaceOrder";
import OrderBookTable from "../components/OrderBookTable";
import CompletedTable from "../components/CompletedTable";

import { getAllOrdersAsync } from "../Redux/Slices/OrderSlice";
import UserPlacedOrderTable from "../components/UserPlacedOrderTable";

const HomePage = () => {
  const dispatch = useDispatch();
  const orderRedux = useSelector((state) => state.order);
  // console.log(orderRedux);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, []);

  return (
    <>
      <Header />

      {(function () {
        try {
          return (
            <div id="home">
              <div className="col-12 row">
                <div className="col-12">
                  <div className="placeOrderContainer">
                    <h6 className="text-center">Place Orders</h6>
                    <PlaceOrder setisLoading={setisLoading} />
                  </div>
                </div>

                <div className="text-center" style={{ height: "25px" }}>
                  {isLoading || orderRedux.isLoading ? (
                    <div className="spinner-border" role="status"></div>
                  ) : null}
                </div>

                <div className="col-12 col-md-6 mt-3">
                  <div className="pendingContainer">
                    <h6 className="text-center"> Pending Order Book </h6>

                    <OrderBookTable
                      setisLoading={setisLoading}
                      orderDataFromRedux={
                        orderRedux.orderBookdata && orderRedux.orderBookdata
                      }
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <div className="completedContainer">
                    <h6 className="text-center"> Completed Order Table</h6>
                    <CompletedTable />
                  </div>
                </div>
              </div>

              <div className="col-12  mt-3">
                <div className="userOrderContainer">
                  <h6 className="text-center">User Placed Orders</h6>
                  <UserPlacedOrderTable
                    orderDataFromRedux={
                      orderRedux.userOrdersdata && orderRedux.userOrdersdata
                    }
                  />
                </div>
              </div>
            </div>
          );
        } catch (error) {
          console.log("Error - ", error.message);
        }
      })()}
    </>
  );
};

export default HomePage;
