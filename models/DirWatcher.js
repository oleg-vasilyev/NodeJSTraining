import * as fs from 'fs';
import { EventEmitter } from "events";


export class DirWatcher {
  _files;
  constructor() { }

  watch(path, delay) {
    this._files = [];
    const eventEmitter = new EventEmitter();

    const isFilesEqual = (files, otherFiles) => {
      const output = files
        && otherFiles
        && files.length === otherFiles.length
        && files.every(thisFile => otherFiles.some(otherFile => otherFile === thisFile));
      return output;
    }

    setInterval(() => {
      fs.readdir(path, (err, files) => {
        if (!isFilesEqual(this._files, files)) {
          eventEmitter.emit('changed');
          this._files = files;
        }
      });
    }, delay);

    return eventEmitter;
  }
}