import axios from "axios";

const privatUrl =
  "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
const monoUrl = "https://api.monobank.ua/bank/currency";

const getPrivatUrl = async () => {
  const { data } = await axios.get(privatUrl);
  return data;
};

let dataMono = [];
const getMonoUrl = async () => {
  await getMonoData();
  setInterval(getMonoData, 62000);
};

const getMonoData = async () => {
  try {
    const { data } = await axios.get(monoUrl);
    dataMono = data;
  } catch (e) {
    console.log(e);
  }
};

getMonoUrl();

const getExchange = async (currency) => {
  if (currency === "USD") {
    const dataPrivat = await getPrivatUrl();
    const codeUSD = 840;
    const message = filterCurrency(currency, codeUSD, dataPrivat);
    return message;
  } else if (currency === "EUR") {
    const dataPrivat = await getPrivatUrl();
    const codeEUR = 978;
    const message = filterCurrency(currency, codeEUR, dataPrivat);
    return message;
  }
};

const filterCurrency = (currency, code, dataPrivat) => {
  const messagePrivat = dataPrivat.reduce((acc, el) => {
    if (el.ccy === currency) {
      acc += `\nPrivat ${currency}: \n     Buy: ${Number(el.buy).toFixed(
        2
      )}\n     Sale: ${Number(el.sale).toFixed(2)}`;
    }
    return acc;
  }, ``);
  const messageMono = dataMono.reduce((acc, el) => {
    if (el.currencyCodeA === code && el.currencyCodeB === 980) {
      acc += `\nMono ${currency}: \n     Buy: ${Number(el.rateBuy).toFixed(
        2
      )}\n     Sale: ${Number(el.rateSell).toFixed(2)}`;
    }
    return acc;
  }, ``);

  return `${messagePrivat}\n${messageMono}`;
};

export { getExchange };
