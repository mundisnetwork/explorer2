import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import sveltePreprocess from 'svelte-preprocess'
import path from 'path'
import replace from '@rollup/plugin-replace'
import { optimizeImports } from 'carbon-preprocess-svelte'

const production = !process.env.ROLLUP_WATCH

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        },
      )

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: 'ui/main.js',
  output: {
    sourcemap: !production,
    format: 'es',
    name: 'app',
    // file: 'static/public/build/bundle.js',
    dir: 'static/public/build/',
  },
  onwarn: function (warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return
    warn(warning)
  },
  moduleContext: (id) => {
    // In order to match native module behaviour, Rollup sets `this`
    // as `undefined` at the top level of modules. Rollup also outputs
    // a warning if a module tries to access `this` at the top level.
    // The following modules use `this` at the top level and expect it
    // to be the global `window` object, so we tell Rollup to set
    // `this = window` for these modules.
    const thisAsWindowForModules = [
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/configuration.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/area-stacked.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/area.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/boxplot.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/bar-grouped.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/bar-simple.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/bar-grouped.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/bar-stacked.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/bullet.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/bubble.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/histogram.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/scatter.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/lollipop.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/line.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/meter.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/radar.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/donut.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/alluvial.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/circle-pack.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/combo.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/gauge.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/pie.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/tree.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/treemap.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/charts/wordcloud.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/axis-chart.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/chart.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/binned-charts.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/pie.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/boxplot.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/circle-pack.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/cartesian-charts.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/gauge.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/meter.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/axis.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/chart-clip.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/grid-brush.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/grid.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/ruler-binned.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/ruler-stacked.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/ruler.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/toolbar.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/two-dimensional-axes.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/zero-line.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/axes/zoom-bar.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/canvas-chart-clip.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/highlights.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/legend.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/modal.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/threshold.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/title-meter.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/title.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/tooltip-axis.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/essentials/tooltip.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/alluvial.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/area-stacked.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/area.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/bar-grouped.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/bar-simple.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/bar-stacked.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/bar.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/boxplot.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/bubble.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/bullet.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/circle-pack.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/donut.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/gauge.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/histogram.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/line.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/lollipop.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/meter.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/pie.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/radar.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/scatter-stacked.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/scatter.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/skeleton-lines.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/skeleton.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/tree.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/treemap.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/graphs/wordcloud.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/layout/layout.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/components/layout/spacer.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/canvas-zoom.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/curves.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/scales-cartesian.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/zoom.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/essentials/dom-utils.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/essentials/events.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/essentials/files.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/essentials/gradient-utils.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/services/essentials/transitions.js',
      ),
      path.relative(
        '',
        'node_modules/@carbon/charts-svelte/node_modules/@carbon/charts/model/model.js',
      ),
    ]

    if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
      return 'window'
    }
  },
  plugins: [
    replace({
      'process.env.NODE_ENV':
        production == true
          ? JSON.stringify('production')
          : JSON.stringify('development'),
      preventAssignment: true,
    }),
    replace({
      '/*# sourceMappingURL=styles.css.map */': '',
      preventAssignment: true,
    }),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
      preprocess: [
        optimizeImports(),
        sveltePreprocess({
          sourceMap: !production,
          postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
          },
        }),
      ],
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `static` directory and refresh the
    // browser on changes when not in production
    !production && livereload('static'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
