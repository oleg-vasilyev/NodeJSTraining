import { DirWatcher, Importer } from "./models";

(() => {
  const importer = new Importer();

  const watcher = new DirWatcher();
  const path = 'data';
  const watchDelay = 100;
  watcher
    .watch(path, watchDelay)
    .on('changed', () => {
      importer.import(path)
        .then(json => {
          console.log(`Data from Import: ${JSON.stringify(json)}`);
        });
    });
})();