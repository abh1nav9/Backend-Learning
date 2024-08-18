const express = require("express");
const users = require("./testData.json");

const app = express();
const PORT = 3000;

// Routes

// HTML Demo

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
      .join("")}
    </ul>

    `;
  res.send(html);
});

// Rest API

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  return res.json({ status: "PENDING" });
});

// Multiple http method requests on a single route

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "PENDING" });
  })
  .delete((req, res) => {
    return res.json({ status: "PENDING" });
  });

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// app.patch('/api/users/:id', (req, res) => {
//     return res.json({status: "PENDING"});
// });

// app.delete('/api/users/:id', (req, res) => {
//     return res.json({status: "PENDING"});
// });

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
