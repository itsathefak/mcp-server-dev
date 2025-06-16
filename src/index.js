require("dotenv").config();
const express = require("express");
const fetchStock = require("./services/fetchStock");

const app = express();
const PORT = process.env.PORT || 3000;

// Simple route to test API
app.get("/", (req, res) => {
  res.send("MCP Stock Price Server is running.");
});

// Main endpoint to get stock price
app.get("/price/:symbol", async (req, res) => {
  const { symbol } = req.params;

  if (!symbol || symbol.length < 1) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  try {
    const data = await fetchStock(symbol);
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ MCP Server running at http://localhost:${PORT}`);
});
