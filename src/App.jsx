import "./App.css";
import Navbar from "./components/Navbar";
import CryptoView from "./pages/CryptoView";
import WatchList from "./pages/WatchList";
import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CardStorage from "./components/CardSorage";
import { getData } from "./function";

const CurrencyContext = createContext(localStorage.getItem('currency') ? { currencies: JSON.parse(localStorage.getItem('currency')) } :{ currencies: 'USD' });

function App() {
  const [curruncy, setCurruncy] = useState(localStorage.getItem('currency') ? { currencies: JSON.parse(localStorage.getItem('currency')) } :{ currencies: 'USD' });
  const [anchor, setAnchor] = useState("right");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [dataStorage, setDataStorage] = useState(getData());

  // WATCHLIST SIDEBAR MUI
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor = "right") => (
    <Box
      sx={{
        width: "510px",
        height: "100000vh",
        color: "#fff",
        background: "rgb(81, 81, 81)",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h1 className="watchlistTitle">WATCHLIST</h1>
      <div className="watchWrap">
        {
          dataStorage && dataStorage.map(el => (
            <CardStorage curruncy={curruncy} key={el.id} message={el} setDataStorage={setDataStorage}/>
          ))
        }
      </div>
    </Box>
  );

  return (
    <>
    {/* NAVBAR  */}
      <Navbar setCurruncy={setCurruncy} toggleDrawer={toggleDrawer}/>
      
      {/* WATCHLIST UI  */}
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>

      {/* ROUTER SETTINGS  */}
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <CurrencyContext.Provider value={curruncy}>
                <WatchList setDataStorage={setDataStorage} CurrencyContext={CurrencyContext} />
              </CurrencyContext.Provider>
            }
          ></Route>
          <Route path="view/:id" element={
             <CurrencyContext.Provider value={curruncy}>
              <CryptoView CurrencyContext={CurrencyContext} />
            </CurrencyContext.Provider>
          }></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
