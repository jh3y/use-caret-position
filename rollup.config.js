import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/package/use-caret-position.js',
  output: [
    {
      file: 'dist/use-caret-position.js',
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/use-caret-position.min.js',
      format: 'cjs',
      exports: 'default',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
  ],
  external: ['react'],
}
