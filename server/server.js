require("dotenv").config()
// console.log(process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Url = require("./models/Url");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("URL Shortener Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Hello from the backend!",
  });
});

app.post("/api/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    const shortCode = nanoid(6);

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode: shortCode,
    });

    res.json(newUrl);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).send("URL not found");
    }
    
    res.redirect(url.originalUrl);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
});

// app.get("/api/urls", async (req, res) => {
//   const urls = await Url.find();
//   res.json(urls);
// });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
