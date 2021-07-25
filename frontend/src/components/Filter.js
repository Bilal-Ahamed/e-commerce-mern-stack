import React, { useState } from "react";

function Filter(props) {
  return (
    <div className="d-flex justify-content-between mb-4 align-items-center">
      <span className="fs-6 fw-light text-secondary">
        {props.count} items was found
      </span>
      <div className="d-flex align-items-center">
        <span className="me-3 fs-6 fw-light">Order</span>
        <select className="form-select fw-light" onChange={props.sortProducts}>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
          <option value="highest">Higher Price</option>
          <option value="lowest">Lower Price</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
