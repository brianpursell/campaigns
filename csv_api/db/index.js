const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  "mongodb://localhost/campaigns",
  { useNewUrlParser: true }
);

const userSchema = new Schema({
  username: { type : String , unique : true, required : true },
  user_id: { type : Number , unique : true, required : true },
  ip: String,
  geo: String,
  industry: String,
  company_size: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

User.deleteMany({}, () => {
  console.log("USERS CLEARED");
});

module.exports = mongoose;
