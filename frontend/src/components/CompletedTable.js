import React from "react";

const CompletedTable = () => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">UserName</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CompletedTable;
