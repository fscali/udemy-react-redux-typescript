import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

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
            contents: `
              import React, { useState } from 'react';
              console.log(react);
            `,
          };
        }

        const cachedResult = await fileCache.getItem(args.path);
        if (cachedResult) {
          return cachedResult;
        }

        //responseURL is a property of the XMLHttpRequest with the final url where I am redirected
        const {
          data,
          request: { responseURL },
        } = await axios.get(args.path);
        const result = {
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
