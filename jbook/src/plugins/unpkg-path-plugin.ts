import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, (args) => {
        return { path: 'index.js', namespace: 'a' };
      });

      // Handle relative path in a module
      build.onResolve({ filter: /^\.+\// }, async (args) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args) => {
        console.log('onLoad', args);

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
