import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/snowglobe.js',
  output: [
    {
      file: 'dist/snowglobe.min.js',
      format: 'umd',
      name: 'addSnow'
    },
    {
      file: 'dist/snowglobe.esm.js',
      format: 'es'
    }
  ],
  plugins: [terser()]
};