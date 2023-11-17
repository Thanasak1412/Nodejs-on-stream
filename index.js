const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

app.post("/api/upload", (req, res) => {
  if (req.headers["content-type"] === "application/octet-stream") {
    let data = Buffer.alloc(0);
    // Listen for 'data' event to receive chunks of data
    req.on("data", (chunk) => {
      data = Buffer.concat([data, chunk]);
    });

    // Listen for 'end' event to handle the end of the stream
    req.on("end", () => {
      const base64 = data.toString("base64");

      console.log(base64);

      res.status(200).send("File upload complete");
    });

    // Handle errors during the stream
    req.on("error", (error) => {
      console.error("Error receiving data:", error.message);
      res.status(500).send("Internal Server Error");
    });
  }
});

app.post("/api/submit", (_req, res) => {
  res.status(200).json("Submit successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
