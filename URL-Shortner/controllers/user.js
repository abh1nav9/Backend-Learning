const {v4: uuidv4} = require("uuid");
const USER = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await USER.create({
    name,
    email,
    password,
  });

  return res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await USER.findOne({email, password});
  if(!user){
    res.render("login", {
      error: "Invalid Username or Password"
    });
  }

  return res.render("home");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
