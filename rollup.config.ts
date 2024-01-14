import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import preserveDirectives from 'rollup-preserve-directives';
import splitChunkByDirectives from './build/splitChunkByDirectivesPlugin';
import nodeResolve from '@rollup/plugin-node-resolve';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import type { RollupOptions } from 'rollup';

const framework = process.env.FRAMEWORK;
const mode = process.env.MODE;
const isProduction = mode === 'production';
const isType = mode === 'type';

const root = fileURLToPath(new URL('.', import.meta.url));
const base = resolve(root, './src/');
const typeBase = resolve(root, './dist/types/');
const outDir = resolve(root, './dist/');
const asPath = (path: string) => resolve(base, `${path}.ts`);
const asTypePath = (path: string) => resolve(typeBase, `${path}.d.ts`);

const baseOptions = {
  external: [/node_modules/]
};

const typeOptions = {
  ...baseOptions,
  input: {
    gamjeong: asTypePath('index'),
    css: asTypePath('css/index'),
    jsxRuntime: asTypePath('runtimes/client'),
    jsxDevRuntime: asTypePath('runtimes/clientDev'),
  },
  output: [
    {
      hoistTransitiveImports: true,
      format: 'es' as const,
      dir: outDir,
      entryFileNames: '[name].d.ts',
      assetFileNames: 'assets/[name]-[hash][extname]',
      chunkFileNames: 'chunks/chunk-[hash].d.ts',
    },
  ],
  plugins: [
    alias({ entries: [{ find: /^@\//, replacement: `${typeBase}/` }] }),
    commonjs({ include: [/node_modules/] }),
    dts(),
    nodeResolve({
      exportConditions: ['types'],
      extensions: ['.d.ts'],
    }),
  ],
};

const defaultOptions = {
  ...baseOptions,
  input: {
    gamjeong: asPath('index'),
    css: asPath('css/index'),
    jsxClient: asPath('runtimes/client'),
    jsxClientDev: asPath('runtimes/clientDev'),
    jsxServer: asPath('runtimes/server'),
    jsxServerDev: asPath('runtimes/serverDev'),
  },
  output: [
    {
      strict: false,
      hoistTransitiveImports: false,
      format: 'es' as const,
      dir: outDir,
      entryFileNames: '[name].js',
      assetFileNames: 'assets/[name]-[hash][extname]',
      chunkFileNames: 'chunks/chunk-[hash].js',
    },
    {
      strict: false,
      hoistTransitiveImports: false,
      format: 'cjs' as const,
      dir: outDir,
      entryFileNames: '[name].cjs',
      assetFileNames: 'assets/[name]-[hash][extname]',
      chunkFileNames: 'chunks/chunk-[hash].cjs',
    },
  ],
  treeshake: {
    moduleSideEffects: false,
  },
  plugins: [
    alias({ entries: [{ find: /^@\//, replacement: `${base}/` }] }),
    commonjs({ include: [/node_modules/] }),
    esbuild({
      jsx: 'automatic',
      jsxImportSource: 'react',
      define: {
        __DEV__: JSON.stringify(!isProduction),
        __FRAMEWORK__: JSON.stringify(framework),
      },
    }),
    nodeResolve({
      extensions: ['.mjs', '.jsx', '.js', '.cjs'].flatMap(ext => [ext.replace('js', 'ts'), ext])
    }),
    preserveDirectives(),
    splitChunkByDirectives(),
  ],
} satisfies RollupOptions;

export default isType ? typeOptions : defaultOptions;
