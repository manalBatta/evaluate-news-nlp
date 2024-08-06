const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const https = require("https");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

const apiKey = process.env.MEANINGCLOUD_API_KEY;

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

app.post("/sentiment", function (req, res) {
  const url = req.body.url;
  const meaningCloudUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${url}`;

  https
    .get(meaningCloudUrl, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        res.json(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(500).send("Error while connecting to MeaningCloud API");
    });
});

describe("Express App", () => {
  it("should return index.html on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("text/html; charset=UTF-8");
  });

  it("should handle errors from MeaningCloud API", async () => {
    jest.spyOn(https, "get").mockImplementation((url, callback) => {
      return {
        on: (event, handler) => {
          if (event === "error") {
            handler(new Error("Mock API error"));
          }
        },
      };
    });

    const res = await request(app)
      .post("/sentiment")
      .send({ url: "https://invalid-url.com" });
    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Error while connecting to MeaningCloud API");
  });
});
