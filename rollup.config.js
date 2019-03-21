import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: "./src/gantt/index.js",
  output: {
    file: './lib/gantt.js',
    format: "iife",
    name: 'gantt'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    postcss({
      extract: true
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement']
      }
    }),
    babel({
      exclude: "node_modules/**"
    }),
    resolve({
      extensions: [ '.ejs', '.js', '.jsx', '.json'],
    }),
  ],
}