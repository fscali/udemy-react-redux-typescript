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
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }
        // if we don't return anything, esbuild proceed to the next handler, otherwise (result is cached) its stops here
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        //responseURL is a property of the XMLHttpRequest with the final url where I am redirected
        const {
          data,
          request: { responseURL },
        } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `       
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);

        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: contents,

          // perché new URL('./','https://unpkg.com/nested-test-pkg@1.0.0/src/index.js').pathname === /nested-test-pkg@1.0.0/src/
          resolveDir: new URL('./', responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
      build.onLoad({ filter: /.*/ }, async (args) => {
        //responseURL is a property of the XMLHttpRequest with the final url where I am redirected
        const {
          data,
          request: { responseURL },
        } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,

          // perché new URL('./','https://unpkg.com/nested-test-pkg@1.0.0/src/index.js').pathname === /nested-test-pkg@1.0.0/src/
          resolveDir: new URL('./', responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
