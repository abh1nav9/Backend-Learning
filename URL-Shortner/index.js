const express = require("express");
const { connectToMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const PORT = 8000;

connectToMongoDb();

const app = express();

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));

