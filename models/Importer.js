import * as fs from 'fs';
const csv = require('convert-csv-to-json');

export class Importer {
  constructor() { }

  import(path) {
    const output = [];
    return new Promise((resolve) => {
      fs.readdir(path, (err, files) => {
        files.forEach(file => {

          const filePath = `${path}\\${file}`;
          const json = csv.getJsonFromCsv(filePath);

          output.push(json);
        });
        resolve(output);
      });
    });
  }

  importSync(path) {
    const output = [];
    const files = fs.readdirSync(path);
    files.forEach(file => {

      const filePath = `${path}\\${file}`;
      const json = csv.getJsonFromCsv(filePath);

      output.push(json);
    });
    return output;
  }
}