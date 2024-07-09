import "./index.scss";
import { formatNumberCurrency, getData } from "../../function";

function CardStorage({ message, setDataStorage, curruncy }) {
  function handleClick(e) {
    e.stopPropagation();
    let datas = getData();
    datas = datas.filter((el) => el.id !== message.id);
    localStorage.setItem("view", JSON.stringify(datas));
    setDataStorage(datas);
  }

  return (
    <div className="cardStorage">
      <img src={message.image} alt="coin icon" />
      <div className="coinRemove">
        <span>
          {(curruncy.currencies == "USD" && "$") ||
            (curruncy.currencies == "EUR" && "€") ||
            (curruncy.currencies == "RUB" && "₽")}{" "}
          {formatNumberCurrency(message.current_price)}
        </span>
        <button onClick={handleClick}>Remove</button>
      </div>
    </div>
  );
}

export default CardStorage;
