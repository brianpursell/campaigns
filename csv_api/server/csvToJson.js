const fs = require("fs");
const path = require("path");
const db = require("../db/index");

const normalize = (row, rowLength) => {
  return row
    .split(",")
    .map(val => val.toLowerCase().trim())
    .slice(0, rowLength || row.length);
};

const jsonify = (header, body) => {
  return body.map((row, i) => {
    const obj = {};

    row.forEach((val, i) => {
      obj[header[i]] = val;
    });

    return obj;
  });
};

const csvToJson = (filename, dir, headerRowIndex, cb) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(dir, filename), (err, data) => {
      if (err) {
        reject(err);
      } else {
        data = data
          .toString()
          .replace(/(,\r)/g, "")
          .split(",\n");

        const header = normalize(data[headerRowIndex]).map(str =>
          str.split(" ").join("_")
        );

        const body = data
          .slice(headerRowIndex + 1)
          .map(row => normalize(row, header.length))
          .filter(row => row.join(""));

        resolve(jsonify(header, body));
      }
    });
  });
};

const saveNewUsers = newUsers => {
  const User = db.model("User");

  newUsers.forEach(user => {
    new User(user).save();
  });
};

const markFilesDone = (dir, filename) => {
  let currentFilename = path.join(dir, filename);
  let newFilename = path.join(dir, `done.${filename}`);
  fs.rename(currentFilename, newFilename, err => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = (dir, headerRowIndex) => {
  fs.readdir(dir, (err, csvFiles) => {
    csvFiles.forEach(filename => {
      let done = filename.split(".")[0] === "done";

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
        console.log("file doesn't exist");
      } else {
        let done = filename.split(".")[0] === "done";

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
