const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");

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

app.post("/api/shorten", (req, res) => {
  const { url } = req.body;

  const shortCode = nanoid(6)

  res.json({
    originalUrl: url,
    shortCode
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
