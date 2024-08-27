const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { restrictToLoggedInUserOnly } = require("./middlewares/auth");
const { connectToMongoDb } = require("./connection");
const URL = require("./models/url");
const PORT = 8000;

connectToMongoDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/", restrictToLoggedInUserOnly, staticRoute);
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));

