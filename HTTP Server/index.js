const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${res.url} :  New Request Received \n`;
  if (req.url === "/favicon.ico") return res.end();
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;

      case "/about":
        res.end("My name is Abhinav Gautam");
        break;

      case "contact":
        res.end("No Contact");
        break;

      default:
        res.end("404 Error");
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server Started!");
});