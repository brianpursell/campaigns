const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const campaigns = require("./seed");

mongoose.connect(
  "mongodb://localhost/campaigns",
  { useNewUrlParser: true }
);

const userSchema = new Schema({
  username: String,
  role: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

User.register(new User({ username: "admin", role: "admin" }), "1234", function(
  err
) {
  if (err) {
    console.error("error saving admin", err);
  }
});

const campaignSchema = new Schema({
  campaign_priority: { type: Number, unique: true, required: true },
  geo: String,
  industry: String,
  company_size: {
    min: Number,
    max: Number
  },
  img_src: String
});

const Campaign = mongoose.model("Campaign", campaignSchema);

Campaign.deleteMany({}, () => {
  console.log("CAMPAIGNS CLEARED -- NEED TO REMOVE FOR PRODUCTION");
  campaigns.forEach(campaign => new Campaign(campaign).save());
});

const getCampaignImg = user => {
  const orConditions = [];
  const companySize = user.get("company_size");

  ["geo", "industry"].forEach(key => {
    const value = user.get(key);
    if (value) {
      const obj = {};
      obj[key] = value;
      orConditions.push(obj);
    }
  });

  if (companySize) {
    orConditions.push({
      $and: [
        { "company_size.min": { $gte: companySize.min } },
        { "company_size.max": { $lte: companySize.max } }
      ]
    });
  }

  return Campaign.findOne({
    $or: orConditions
  })
    .select("img_src")
    .sort({ campaign_priority: 1 });
};

module.exports = {
  User,
  Campaign,
  getCampaignImg
};
