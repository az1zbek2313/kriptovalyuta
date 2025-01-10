import { useContext, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./index.scss";
import { useParams } from "react-router-dom";

function ApexChart({ curr, CurrencyContext, currChange }) {
  const [valutes, setValute] = useState("dayChanges");
  const [timeChange, setTime] = useState([]);
  const [time, setTimeValue] = useState("24h");
  const params = useParams();
  const [amount, setAmount] = useState(
    currChange == "EUR" ? "eur" : currChange == "RUB" ? "rub" : "usd"
  );

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${amount}&days=${time}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTime(data);
        setAmount(currChange);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [valutes, time, currChange, amount]);

  const formatDate = (value, format) => {
    const date = new Date(value);
    if (format === "time") {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes} ${ampm}`;
    } else if (format === "day") {
      return date.toLocaleString("default", { day: "2-digit" });
    } else if (format === "month") {
      return date.toLocaleString("default", { month: "short" });
    }
  };

  return (
    <div className="container">
      <div>
        <div className="chart" id="chart">
          <ReactApexChart
            options={{
              chart: {
                type: "line",
                stacked: false,
                height: "900px",
                width: "100%",
                background: "rgb(22, 23, 27)",
                zoom: {
                  type: "x",
                  enabled: false,
                  autoScaleYaxis: false,
                },
                toolbar: {
                  autoSelected: "zoom",
                },
              },
              grid: {
                show: true,
                opacity: 0,
                strokeWidth: 0,
                borderColor: "#030303",
              },
              dataLabels: {
                enabled: false,
              },
              markers: {
                size: 0,
                colors: "blue",
              },
              title: {
                text:
                  (valutes === "dayChanges" &&
                    `Price ( Past 1 Days ) in ${currChange}`) ||
                  (valutes === "monthChanges" &&
                    `Price ( Past 30 Days ) in ${currChange}`) ||
                  (valutes === "twoMonthChanges" &&
                    `Price ( Past 60 Days ) in ${currChange}`) ||
                  (valutes === "yearChanges" &&
                    `Price ( Past 1 Years ) in ${currChange}`),
                align: "center",
              },
              yaxis: {
                labels: {
                  formatter: function (val) {
                    return val;
                  },
                },
              },
              xaxis: {
                title: "",
                type: "datetime",
                labels: {
                  formatter: function (value) {
                    if (valutes === "dayChanges") {
                      return formatDate(value, "time");
                    } else if (valutes === "monthChanges") {
                      return formatDate(value, "day");
                    } else if (valutes === "twoMonthChanges") {
                      return formatDate(value, "day");
                    } else if (valutes === "yearChanges") {
                      return formatDate(value, "month");
                    }
                  },
                },
              },
              tooltip: {
                shared: false,
                fillSeriesColor: "#000",
                y: {
                  formatter: function (val) {
                    return val;
                  },
                },
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
            }}
            series={[
              {
                name:
                  valutes === "dayChanges"
                    ? `${curr?.symbol?.toUpperCase()}, ${currChange} => 24h EXCHANGES`
                    : valutes === "monthChanges"
                    ? `${curr?.symbol?.toUpperCase()}, ${currChange} => 1 MONTH EXCHANGES`
                    : valutes === "twoMonthChanges"
                    ? `${curr?.symbol?.toUpperCase()}, ${currChange} => 2 MONTH EXCHANGES`
                    : `${curr?.symbol?.toUpperCase()}, ${currChange} => 1 YEAR EXCHANGES`,
                data:
                  valutes === "dayChanges"
                    ? timeChange?.prices?.map((timestamp) => ({
                        x: timestamp[0],
                        y: timestamp[1],
                      }))
                    : valutes === "monthChanges"
                    ? timeChange?.prices?.map((timestamp) => ({
                        x: timestamp[0],
                        y: timestamp[1],
                      }))
                    : valutes === "twoMonthChanges"
                    ? timeChange?.prices?.map((timestamp) => ({
                        x: timestamp[0],
                        y: timestamp[1],
                      }))
                    : timeChange?.prices?.map((timestamp) => ({
                        x: timestamp[0],
                        y: timestamp[1],
                      })),
                color: "rgb(135, 206, 235)",
              },
            ]}
            type="line"
          />
        </div>
        <div id="html-dist"></div>
      </div>
      <div>
        <ul className="listGroup">
          <input defaultChecked={true} type="radio" name="exchange" id="day" />
          <li
            onClick={() => {
              setValute("dayChanges");
              setTimeValue("24h");
            }}
          >
            <label htmlFor="day">24 Hours</label>
          </li>
          <input type="radio" name="exchange" id="month" />
          <li
            onClick={() => {
              setValute("monthChanges");
              setTimeValue("30d");
            }}
          >
            <label htmlFor="month">30 Days</label>
          </li>
          <input type="radio" name="exchange" id="twoMonth" />
          <li
            onClick={() => {
              setValute("twoMonthChanges");
              setTimeValue("60d");
            }}
          >
            <label htmlFor="twoMonth">2 Months</label>
          </li>
          <input type="radio" name="exchange" id="year" />
          <li>
            <label
              onClick={() => {
                setValute("yearChanges");
                setTimeValue("1y");
              }}
              htmlFor="year"
            >
              1 Year
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ApexChart;
