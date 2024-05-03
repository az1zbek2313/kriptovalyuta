import React, { useState } from "react";
import "./index.scss";

function Navbar({ setCurruncy, toggleDrawer }) {
  const [current, setCurrent] = useState(
    JSON.parse(localStorage.getItem("currency"))
  );

  console.log(7, current);

  return (
    <div className="nav--container">
      <span className="logotip">CRYPTOFOLIO</span>
      <section className="currencyChange">
        <select
          value={current}
          onChange={(e) => {
            setCurruncy({ currencies: String(e.target?.value) });
            setCurrent(String(e.target?.value));
            localStorage.setItem("currency", JSON.stringify(e.target?.value));
          }}
          name="currency"
          id="currencyChanges"
        >
          {(!current && (
            <>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </>
          )) ||
            (current == "USD" && (
              <>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="RUB">RUB</option>
              </>
            )) ||
            (current == "EUR" && (
              <>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
              </>
            )) ||
            (current == "RUB" && (
              <>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </>
            ))}
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
