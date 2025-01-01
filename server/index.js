const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookiesparser = require("cookie-parser");
const router = require("../server/Router/router.js");
app.use(cookiesparser());
app.use(express.json());
dotenv.config();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => {
    console.log("Connected Succefully");
  })
  .catch((err) => {
    console.log("Error In Connecting  :", err);
  });

app.use("/Formbot", router);

app.listen(4000, (res, req) => {
  console.log("Listening to 4000");
});
