import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'rollup-plugin-dts';
import preserveDirectives from 'rollup-preserve-directives';
import { splitChunkByDirectives } from './build/splitChunkByDirectivesPlugin';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isType = mode === 'type';
  const framework = process.env.FRAMEWORK;
  const outDir = resolve(__dirname, 'dist/');

  const base = !isType ? resolve(__dirname, 'src') : resolve(__dirname, 'dist/types');
  const ext = !isType ? '.ts' : '.d.ts';
  const asPath = (path: string) => resolve(base, path + ext);

  const typeOptions = {
    '.': {
      esbuild: false as const,
      plugins: [dts()],
    },
    '.build.lib': {
      entry: {
        gamjeong: asPath('index'),
        jsxRuntime: asPath('runtimes/client'),
        jsxDevRuntime: asPath('runtimes/clientDev'),
      },
      formats: ['es' as const],
    },
    '.build.rollupOptions': {
      output: [
        {
          format: 'es' as const,
          dir: outDir,
          entryFileNames: '[name].d.ts',
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'chunks/chunk-[hash].d.ts',
        },
      ],
    },
    '.resolve': {
      conditions: ['types'],
      extensions: ['.d.ts'],
    },
  };

  return {
    root: __dirname,
    build: {
      outDir,
      emptyOutDir: false,
      minify: isProduction,
      ssr: true,
      lib: {
        entry: {
          gamjeong: asPath('index'),
          jsxClient: asPath('runtimes/client'),
          jsxClientDev: asPath('runtimes/clientDev'),
          jsxServer: asPath('runtimes/server'),
          jsxServerDev: asPath('runtimes/serverDev'),
        },
        formats: ['es', 'cjs'],
        ...(isType && typeOptions['.build.lib']),
      },
      commonjsOptions: { include: [/node_modules/] },
      rollupOptions: {
        output: [
          {
            format: 'es' as const,
            dir: outDir,
            entryFileNames: '[name].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
            chunkFileNames: 'chunks/chunk-[hash].js',
          },
          {
            format: 'cjs' as const,
            dir: outDir,
            entryFileNames: '[name].cjs',
            assetFileNames: 'assets/[name]-[hash][extname]',
            chunkFileNames: 'chunks/chunk-[hash].cjs',
          },
        ],
        ...(isType && typeOptions['.build.rollupOptions']),
      },
    },
    resolve: {
      alias: [{ find: /^@\//, replacement: `${resolve(__dirname, './src/')}/` }],
      ...(isType && typeOptions['.resolve']),
    },
    define: {
      __DEV__: JSON.stringify(!isProduction),
      __FRAMEWORK__: JSON.stringify(framework),
    },
    plugins: [
      preserveDirectives(),
      splitChunkByDirectives(),
    ],
    ...(isType && typeOptions['.']),
  };
});
