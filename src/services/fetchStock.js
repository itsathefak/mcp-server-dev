const axios = require("axios");

module.exports = async function fetchStock(symbol) {
  const options = {
    method: "GET",
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`,
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const stock = response.data.body[0]; // ✅ correct location

    if (!stock || !stock.symbol || !stock.regularMarketPrice) {
      throw new Error("Missing key stock fields");
    }

    return {
      symbol: stock.symbol,
      name: stock.shortName || stock.longName || stock.displayName,
      price: stock.regularMarketPrice,
      currency: stock.currency || "USD",
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error("❌ Error in fetchStock:", err.response?.data || err.message);
    throw new Error("Invalid response from API");
  }
};
