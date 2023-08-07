const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.npdx1az.mongodb.net/testdb?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.get("/getusers", (req, res) => {
  UserModel.find().then((data) => {
    res.json({ success: true, data: data });
  });
});

app.post("/createuser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running");
});
