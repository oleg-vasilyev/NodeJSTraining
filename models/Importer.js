import * as fs from 'fs';
const csv = require("csvtojson");

export class Importer {
  constructor() { }

  import(path) {
    const promises = [];
    return new Promise((resolve) => {
      fs.readdir(path, (err, files) => {
        files.forEach(file => {

          const convertedFilePromise = new Promise((resolve) => {
            const filePath = `${path}\\${file}`;

            csv()
              .fromFile(filePath)
              .on("end_parsed", function (json) {
                return resolve(json);
              });
          });

          promises.push(convertedFilePromise);
        });
        resolve(Promise.all(promises));
      });
    });
  }

  importSync(path) {

  }
}