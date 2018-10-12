const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/users",
  { useNewUrlParser: true }
);

mongoose.model("User", {
  name: String,
  user_id: Number,
  ip: String,
  geo: String,
  industry: String,
  company_size: String
});

const User = mongoose.model("User");

// clear users
User.deleteMany({}, () => {
  console.log("USERS CLEARED");
});

module.exports = mongoose;
