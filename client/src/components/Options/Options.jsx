import React from "react";
import "./Options.css";

const Options = () => {
  return (
    <div className="options-container">
      <div className="options-header">
        <h2>Options</h2>
        <p>Choose your options</p>
      </div>
      <ul className="options-list">
        <li className="options-items">
          <a className="options-link" href="/bank">
            Bank
          </a>
        </li>
        <li className="options-items">
          <a className="options-link" href="/address">
            Your Address
          </a>
        </li>
        <li className="options-items">
          <a className="options-link" href="/voucher">
            Voucher
          </a>
        </li>
        <li className="options-items">
          <a className="options-link" href="/bill">
            Bill
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Options;
