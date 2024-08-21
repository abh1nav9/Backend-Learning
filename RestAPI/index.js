const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./testData.json");

const app = express();
const PORT = 3000;

//MongoDB connection
const mongoURI = 'mongodb+srv://abh1nav:Abh1nav%4009@taskmanager.9z2q7q7.mongodb.net/?retryWrites=true&w=majority'; // Ensure this URI is correct
mongoose
.connect(mongoURI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error", err));



//Schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
});

//Schema to Model
const User = mongoose.model("user", userSchema);

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./testData.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
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
    const userID = parseInt(req.params.id);
    const updatedData = req.body;
    const user = users.find((user) => user.id === userID);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    user.first_name = updatedData.first_name || user.first_name;
    user.last_name = updatedData.last_name || user.last_name;
    user.email = updatedData.email || user.email;
    user.gender = updatedData.gender || user.gender;
    user.job_title = updatedData.job_title || user.job_title;

    fs.writeFile("./testData.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ status: "Error writing to file" });
      }
      return res.json({ status: "User Data Updated", user });
    });
  })
  .delete((req, res) => {
    const userID = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userID);

    if (userIndex === -1) {
        return res.status(404).send("User Not Found");
    }

    users.splice(userIndex, 1);

    fs.writeFile("./testData.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error writing to file" });
        }
        return res.json({ status: "User Deleted" });
    });
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
