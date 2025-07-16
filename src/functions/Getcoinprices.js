import axios from "axios";

export const Getcoinprice = (id,days) => {
    const prices = axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
      .then((response) => {
        console.log("prices->", response.data.prices);
        return response.data.prices;

      })
      .catch((error) => {
        console.error(error);
      });
    return prices;
}