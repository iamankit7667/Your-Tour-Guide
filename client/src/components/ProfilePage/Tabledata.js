import React from "react";

function Tabledata(props) {
  return (
    <tbody>
      <tr>
        <th>{props.heading}</th>
        <td>{props.data}</td>
      </tr>
    </tbody>
  );
}

export default Tabledata;
