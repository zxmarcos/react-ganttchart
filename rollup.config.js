import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: "./src/gantt/index.js",
  output: {
    file: './lib/dev.js',
    format: "iife",
    name: 'devx.js'
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs()
  ],
}