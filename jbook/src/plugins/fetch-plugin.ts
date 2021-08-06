import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }

        //responseURL is a property of the XMLHttpRequest with the final url where I am redirected
        const {
          data,
          request: { responseURL },
        } = await axios.get(args.path);
        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents =
          fileType === 'css'
            ? `
        
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);

        `
            : data;
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: contents,

          // perché new URL('./','https://unpkg.com/nested-test-pkg@1.0.0/src/index.js').pathname === /nested-test-pkg@1.0.0/src/
          resolveDir: new URL('./', responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
