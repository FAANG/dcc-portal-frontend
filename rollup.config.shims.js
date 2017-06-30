import uglify      from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'shims.js',
  dest: 'webroot/static/shims.js', // output a single application bundle
  sourceMap: false,
  format: 'es',
  context: 'window',
  onwarn: function(warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      uglify()
  ]
}
