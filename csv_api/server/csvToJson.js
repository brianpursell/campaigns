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

    // parse company size string
    if (obj.hasOwnProperty("company_size")) {
      const companySize = obj.company_size;
      const lastChar = companySize.length - 1;
      if (companySize[lastChar] === "+") {
        obj.company_size = {
          min: Number(companySize.slice(0, lastChar)),
          max: Number.MAX_VALUE
        };
      } else {
        const range = obj.company_size.split("-");
        obj.company_size = {
          min: Number(range[0]),
          max: Number(range[1])
        };
      }
    }

    // for dev: if username not provided concat 'user' with user_id
    if (!obj.hasOwnProperty("username")) {
      obj.username = `user${obj.user_id}`;
    }

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
