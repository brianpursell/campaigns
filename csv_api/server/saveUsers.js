const fs = require("fs");
const path = require("path");
const db = require("../db");
const csvToJson = require("./csvToJson");

const saveNewUsers = newUsers => {
  const User = db.model("User");

  newUsers.forEach(user => {
    User.register(new User(user), user.password || '1234', function(err) {
      if (err) {
        console.error('error saving user', err);
      }
    });
  });
};

const markFilesDone = (dir, filename) => {
  const currentFilename = path.join(dir, filename);
  const newFilename = path.join(dir, `done.${filename}`);
  fs.rename(currentFilename, newFilename, err => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = (dir, headerRowIndex) => {
  fs.readdir(dir, (err, csvFiles) => {
    csvFiles.forEach(filename => {
      const done = filename.split(".")[0] === "done";

      // reset seed file
      if (filename === 'done.seed.csv') {
        const currentFilename = path.join(dir, filename);
        const newFilename = path.join(dir, 'seed.csv');
        fs.rename(currentFilename, newFilename, err => {
          if (err) {
            console.error(err);
          }
        })
      }

      if (!done) {
        csvToJson(filename, dir, headerRowIndex)
          .then(newUsers => {
            saveNewUsers(newUsers);
            markFilesDone(dir, filename);
          })
          .catch(err => console.error("readdir", err));
      }
    });
  });

  fs.watch(dir, (eventType, filename) => {
    fs.stat(path.join(dir, filename), (err, stats) => {
      if (err) {
        console.error("file doesn't exist");
      } else {
        const done = filename.split(".")[0] === "done";

        if (filename && eventType === "rename" && !done) {
          csvToJson(filename, dir, headerRowIndex)
            .then(newUsers => {
              saveNewUsers(newUsers);
              markFilesDone(dir, filename);
            })
            .catch(err => console.error("watch", err));
        }
      }
    });
  });
};
