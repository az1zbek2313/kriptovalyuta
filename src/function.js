
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatNumberCurrency(number) {
    let formattedNumber = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(number);
  
    if (formattedNumber.includes('.')) {
      const [wholePart, decimalPart] = formattedNumber.split('.');
      formattedNumber = `${wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalPart}`;
    } else {
      formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  
    return formattedNumber;
  }

  function getData() {
    let data = [];
    if (localStorage.getItem('view')) {
        data = JSON.parse(localStorage.getItem('view'));
    }

    return data;
  }

  export {formatNumber, formatNumberCurrency, getData};