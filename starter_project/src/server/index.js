const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const https = require("https");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

// Variables for url and api key
const apiKey = process.env.MEANINGCLOUD_API_KEY;
console.log(`Your API key is ${apiKey}`);

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

// POST Route for Sentiment Analysis
app.post("/sentiment", function (req, res) {
  const url = req.body.url;
  const meaningCloudUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${url}`;

  https
    .get(meaningCloudUrl, (response) => {
      let data = "";

      // A chunk of data has been received.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      response.on("end", () => {
        res.json(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(500).send("Error while connecting to MeaningCloud API");
    });
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
