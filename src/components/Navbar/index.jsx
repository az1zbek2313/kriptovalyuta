import React from "react";
import "./index.scss";

function Navbar({ setCurruncy, toggleDrawer }) {
  console.log(5, JSON.parse(localStorage.getItem("currency")));
  return (
    <div className="nav--container">
      <span className="logotip">CRYPTOFOLIO</span>
      <section className="currencyChange">
        <select
          onChange={(e) => {
            setCurruncy({ currencies: String(e.target?.value) });
            localStorage.setItem("currency", JSON.stringify(e.target?.value));
          }}
          name="currency"
          id="currencyChanges"
        >
          {(JSON.parse(localStorage.getItem("currency")) == "USD" ||
            !JSON.parse(localStorage.getItem("currency"))) && (
            <option value="USD">USD</option>
          )}
          {(JSON.parse(localStorage.getItem("currency")) == "EUR" ||
            JSON.parse(localStorage.getItem("currency")) == "USD" ||
            !JSON.parse(localStorage.getItem("currency"))) && (
            <option value="EUR">EUR</option>
          )}
          {JSON.parse(localStorage.getItem("currency")) == "EUR" && (
            <option value="USD">USD</option>
          )}
          <option value="RUB">RUB</option>
          {JSON.parse(localStorage.getItem("currency")) == "RUB" && (
            <option value="EUR">EUR</option>
          )}
          {JSON.parse(localStorage.getItem("currency")) == "RUB" && (
            <option value="USD">USD</option>
          )}
        </select>
        <button
          className="watchlistButton"
          onClick={toggleDrawer("right", true)}
        >
          WATCH LIST
        </button>
      </section>
    </div>
  );
}

export default Navbar;
