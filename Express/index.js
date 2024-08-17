const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Home Page")
});

app.get("/about", (req, res) => {
    return res.send(`Hello ${req.query.name}`);
    // http://localhost:8000/about?name=Abhinav
});

app.listen(8000, () => console.log("Server Started"));