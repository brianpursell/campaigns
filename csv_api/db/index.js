const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/campaigns",
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

// clear users for dev env
if (process.env.NODE_ENV === "development") {
  const User = mongoose.model("User");

  User.deleteMany({}, () => {
    console.log("USERS CLEARED");
  });
}

module.exports = mongoose;
