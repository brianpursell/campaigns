require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const seedAndWatch = require("./csvToJson");
const path = require("path");
const csvDir = path.join(__dirname, "../uploads");
const upload = require("./multerConfig");
const port = 3030;

app.use(bodyParser.urlencoded({ extended: false }));

// parse csv files and seed db on app start
// watch csv dir, parse new files, add to db
seedAndWatch(csvDir, 2);

app.post("/users_csv", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.error(err);
      res.status(400).send("Oops. Something went wrong.");
    } else {
      res.send("The file has been saved!");
    }
  });
});

app.listen(port, () => {
  console.log(`LISTENING: ${port}`);
});
