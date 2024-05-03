import React, { useContext, useEffect, useState } from "react";
import coin from "../../assets/free-coin-icon.png";
import ApexChart from "../../components/ApexChart";
import "./index.scss";
import { useParams } from "react-router-dom";
import { formatNumber } from "../../function";

function CryptoView({ CurrencyContext }) {
  const curruncy = useContext(CurrencyContext);
  const [curr, setCurruncy] = useState("");
  const [loader, setLoader] = useState(false);
  const params = useParams();

  console.log(14, curruncy.currencies);

  useEffect(() => {
    setLoader(true);

    // FETCH DATA
    fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurruncy(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="view--container">
      <div className="view__coinAbout">
        <div className="view__coinIcon">
          {curr?.image ? (
            <img src={curr.image.large} alt="coin icon" />
          ) : (
            <img src={coin} alt="coin icon" />
          )}
          {curr?.name ? <h2>{curr.name}</h2> : <h2>Bitcoin</h2>}
        </div>
        {curr?.description ? (
          <p>{curr.description.en.slice(0, 400)}</p>
        ) : (
          <p>
            Bitcoin is the first successful internet money based on peer-to-peer
            technology; whereby no central bank or authority isinvolved in the
            transaction and production of the Bitcoincurrency.
          </p>
        )}
        <div>
          <h3>Rank:</h3>
          {curr?.market_cap_rank ? (
            <span>{curr.market_cap_rank}</span>
          ) : (
            <span>1</span>
          )}
        </div>
        <div>
          <h3>Current Price:</h3>
          {curr?.market_data?.current_price ? (
            (curruncy.currencies == "USD" && (
              <span>
                {curruncy.currencies == "USD" && "$"}{" "}
                {formatNumber(curr.market_data.current_price.usd)}
              </span>
            )) ||
            (curruncy.currencies == "EUR" && (
              <span>
                {curruncy.currencies == "EUR" && "€"}{" "}
                {formatNumber(curr.market_data.current_price.eur)}
              </span>
            )) ||
            (curruncy.currencies == "RUB" && (
              <span>
                {curruncy.currencies == "RUB" && "₽"}{" "}
                {formatNumber(curr.market_data.current_price.rub)}
              </span>
            ))
          ) : (
            <span>
              {(curruncy.currencies == "USD" && "$") ||
                (curruncy.currencies == "EUR" && "€") ||
                (curruncy.currencies == "RUB" && "₽")}{" "}
              0,000,000
            </span>
          )}
        </div>
        <div>
          <h3>Market Cap:</h3>
          {curr?.market_data?.market_cap ? (
            (curruncy.currencies == "USD" && (
              <span>
                {curruncy.currencies == "USD" && "$"}{" "}
                {formatNumber(curr.market_data.market_cap.usd)}M
              </span>
            )) ||
            (curruncy.currencies == "EUR" && (
              <span>
                {curruncy.currencies == "EUR" && "€"}{" "}
                {formatNumber(curr.market_data.market_cap.eur)}M
              </span>
            )) ||
            (curruncy.currencies == "RUB" && (
              <span>
                {curruncy.currencies == "RUB" && "₽"}{" "}
                {formatNumber(curr.market_data.market_cap.rub)}M
              </span>
            ))
          ) : (
            <span>
              {(curruncy.currencies == "USD" && "$") ||
                (curruncy.currencies == "EUR" && "€") ||
                (curruncy.currencies == "RUB" && "₽")}{" "}
              0,000,000M
            </span>
          )}
        </div>
      </div>
      <div className="view__Chart">
        <ApexChart
          curr={curr}
          CurrencyContext={CurrencyContext}
          currChange={curruncy.currencies}
        />
      </div>
      {/* CryptoView, {curruncy.currencies} */}
    </div>
  );
}

export default CryptoView;
