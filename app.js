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
          const data = JSON.stringify(json);
          console.log(`Data from import: ${data}`);
        });

      const data = JSON.stringify(importer.importSync(path));
      console.log(`Data from importSync: ${data}`);
    });
})();