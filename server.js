// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); // REQUIRED for Code.org

// ALWAYS needed for safety on Code.org
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

// ================================
//   SPOONACULAR PROXY ENDPOINT
// ================================
app.get("/complexSearch", async (req, res) => {
  try {
    // Forward ALL query params exactly as Code.org sends them
    const qs = new URLSearchParams(req.query).toString();

    const apiUrl =
      `https://api.spoonacular.com/recipes/complexSearch?${qs}&apiKey=${process.env.API_KEY}`;

    // Fetch from Spoonacular
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed", details: error.toString() });
  }
});

// Default route for debugging
app.get("/", (req, res) => {
  res.send("Spoonacular proxy alive");
});

// Render uses process.env.PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Proxy running on " + PORT));
