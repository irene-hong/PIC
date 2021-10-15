import React, { Fragment } from "react";

export default function Spinner() {
  return (
    <Fragment>
      <i
        className="fa fa-spinner fa-spin"
        style={{ width: "20px", margin: "auto", display: "block" }}
      ></i>
    </Fragment>
  );
}
