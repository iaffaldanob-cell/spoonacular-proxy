const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const API_KEY = process.env.API_KEY;

app.use(express.json());

// Allow requests from anywhere (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Proxy endpoint
app.get("/complexSearch", async (req, res) => {
  try {
    let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + API_KEY;

    // Add all query parameters from App Lab request
    for (const param in req.query) {
      url += `&${param}=${encodeURIComponent(req.query[param])}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Listen on the port Render assigns
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port", PORT));