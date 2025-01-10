import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import imges from "../../assets/free-coin-icon.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination as slide, Autoplay } from "swiper/modules";
import Table from "@mui/joy/Table";
import { Pagination, Stack } from "@mui/material";
import { formatNumber, formatNumberCurrency, getData } from "../../function";
import { useNavigate } from "react-router-dom";

function WatchList({ setDataStorage, CurrencyContext }) {
  const curruncy = useContext(CurrencyContext);
  const navigate = useNavigate();
  const [swipper, setSwiper] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const Bool = getData();
  const nameRef = useRef();

  function search() {
    const searchTerm = nameRef.current.value.toUpperCase();
    if (searchTerm) {
      const filtered = data.filter((item) =>
        item.name.toUpperCase().includes(searchTerm)
      );
      setData(filtered);
    } else {
      setLoader(true);
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curruncy.currencies}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }

  const fetchCryptoData = (page = 1) => {
    setLoader(true);
    fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curruncy.currencies}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
    )
        .then((res) => res.json())
        .then((data) => {
          setSwiper(data)
          setData(data)
          return
        })
        .catch((err) => console.error(err))
        .finally(() => setLoader(false));
};

useEffect(() => {
    fetchCryptoData(page);
}, [page, curruncy]);

  
  function handlePagination(e) {
    setPage(Number(e.target.innerText));
  }

  return (
    <div className="watch--container">
      <div className="watch__cryptoFolio">
        <div className="watch__cryptoFolio--container">
          <h1>CRYPTOFOLIO WATCH LIST</h1>
          <p>Get all the Info regarding your favorite Crypto Currency</p>
          <Swiper
            slidesPerView={window.screen.availWidth > 420 ? (window.screen.availWidth < 880 ? 3 : 4) : 2}
            spaceBetween={30}
            modules={[slide, Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {swipper &&
              swipper.map((el) => (
                <SwiperSlide key={el.id} onClick={() => {navigate(`/view/${el.id}`)}} className="mySwiper__swipper">
                  <img src={!loader ? el.image : imges} alt="coin icon" />
                  <div className="mySwiper__price">
                    <p>
                      {el.symbol}&nbsp;&nbsp;
                      <span
                        style={
                          el.price_change_percentage_24h_in_currency > 0
                            ? { color: "rgb(14, 203, 129)" }
                            : { color: "rgb(255, 0, 0)" }
                        }
                      >
                        {el.price_change_percentage_24h_in_currency > 0
                          ? "+"
                          : "-"}
                        {Math.trunc(
                          Math.abs(
                            el.price_change_percentage_24h_in_currency * 100
                          )
                        ) / 100}
                        %
                      </span>
                    </p>
                    <h3>
                      <span>
                        {(curruncy.currencies == "USD" && "$") ||
                          (curruncy.currencies == "EUR" && "€") ||
                          (curruncy.currencies == "RUB" && "₽")}
                      </span>{" "}
                      {el.current_price}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      <div className="watch__cryptoCurrency">
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <input
          ref={nameRef}
          onKeyUp={search}
          placeholder="Search For a Crypto Currency.."
          type="search"
          name="serachCurrency"
          id="serachCurrency"
        />
        <Table hoverRow className="watch__table">
          <thead style={{ background: "blue" }}>
            <tr>
              <th style={{ width: "40%" }}>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th className="currancy__table">Market Cap</th>
            </tr>
          </thead>
          <tbody id="product-list">
            {
              data &&
              data.map((el) => (
                <tr
                  className="product"
                  onClick={() => {
                    const datas = getData();
                    const bool = datas.some((item) => item.id == el.id);
                    if (!bool || datas.length == 0) {
                      datas.push(el);
                    }

                    console.log(76, datas);
                    setDataStorage(datas);
                    localStorage.setItem("view", JSON.stringify(datas));
                    navigate(`view/${el.id}`);
                  }}
                  key={el.id}
                >
                  <td className="firstCoins">
                    <img
                      width={50}
                      height={50}
                      src={!loader ? el.image : imges}
                      alt="images"
                    />
                    <div className="coin">
                      <p>{el.symbol}</p>
                      <aside>{el.name}</aside>
                    </div>
                  </td>
                  <td>
                    {(curruncy.currencies == "USD" && "$") ||
                      (curruncy.currencies == "EUR" && "€") ||
                      (curruncy.currencies == "RUB" && "₽")}{" "}
                    {formatNumberCurrency(el.current_price)}
                  </td>
                  <td className="dayChange">
                    <div>
                      <RemoveRedEyeIcon
                        sx={
                          Bool.some((item) => item.id == el.id) && {
                            color: "rgb(38, 237, 28)",
                          }
                        }
                        className="dayChange__eye"
                      />
                      <span
                        style={
                          el.price_change_percentage_24h_in_currency > 0
                            ? { color: "rgb(14, 203, 129)" }
                            : { color: "rgb(255, 0, 0)" }
                        }
                      >
                        {el.price_change_percentage_24h_in_currency > 0
                          ? "+"
                          : "-"}
                        {Math.trunc(
                          Math.abs(
                            el.price_change_percentage_24h_in_currency * 100
                          )
                        ) / 100}
                        %
                      </span>
                    </div>
                  </td>
                  <td className="currancy__table__market">
                    {(curruncy.currencies == "USD" && "$") ||
                      (curruncy.currencies == "EUR" && "€") ||
                      (curruncy.currencies == "RUB" && "₽")}{" "}
                    {formatNumber(el.market_cap)}M
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>

      <Stack spacing={2} sx={{ mb: "30px", width: "342px", mx: "auto" }}>
        <Pagination
          onChange={handlePagination}
          count={10}
          className="pagination"
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.16)",
                color: "rgb(135, 206, 235)",
              },
            },
            "& button": {
              color: "rgb(135, 206, 235)",
            },
          }}
        />
      </Stack>
    </div>
  );
}

export default WatchList;
