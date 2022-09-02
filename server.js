const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

// env variables
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.API_KEY;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static("build"));

app.get("/api/", async (req, res, next) => {
  try {
    const params = new URLSearchParams({
      ...req.query,
      appid: API_KEY,
    });
    const { data } = await axios.get(`${API_BASE_URL}?${params}`);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));