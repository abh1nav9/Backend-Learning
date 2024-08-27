const express = require("express");
const path = require("path");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");
const PORT = 8000;

connectToMongoDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", staticRoute);
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));

