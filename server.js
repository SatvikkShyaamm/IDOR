const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Fake credentials (any user can log in here)
  if (username && password) {
    // Give "user" access by default
    res.redirect(`/dashboard?access=user`);
  } else {
    res.send("Login failed. Try again.");
  }
});

// Dashboard
app.get("/dashboard", (req, res) => {
  const access = req.query.access;

  if (access === "admin") {
    // Vulnerability: flag is exposed if user changes URL to ?access=admin
    res.send(`
      <h2>Welcome, Admin!</h2>
      <p>🎉 Congrats, here is your flag:</p>
      <code>ACS{URL_PARAMETER_MANIPULATION}</code>
    `);
  } else {
    res.send(`
      <h2>Welcome, User</h2>
      <p>You have normal user access. Why are you here??</p>
    `);
  }
});

// Run server
app.listen(3000, () => {
  console.log("CTF challenge running on http://localhost:3000");
});

