const fs = require("fs");
const path = require("path");

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

module.exports = (filename, dir, headerRowIndex, cb) => {
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
