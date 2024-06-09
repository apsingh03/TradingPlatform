import React from "react";

const UserPlacedOrderTable = ({ orderDataFromRedux }) => {
  return (
    <>
      {(function () {
        try {
          return (
            <div className="col-12 ">
              <div>
                <div className="p-3" style={{ backgroundColor: "#a3b2bd" }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(orderDataFromRedux && orderDataFromRedux)
                        .sort((a, b) => b.id - a.id)
                        .map((data, index) => {
                          if (data.status === "Pending") {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td> {data.qty}</td>

                                <td>&#8377; {data.price}</td>

                                <td
                                  style={{
                                    color:
                                      data.type === "BUY"
                                        ? "#2cc525"
                                        : "#ff5050",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {" "}
                                  {data.type}{" "}
                                </td>
                                <td> {data.status}</td>
                                <td> {Date(data.createdAt)}</td>
                                <td>
                                  <button className="btn btn-danger ">
                                    Delete
                                  </button>
                                </td>
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
          console.log("UserPlacedOrder Table.js Error - ", error.message);
        }
      })()}
    </>
  );
};

export default UserPlacedOrderTable;
