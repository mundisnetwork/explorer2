const plugin = require('tailwindcss/plugin')

const production = !process.env.ROLLUP_WATCH
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        '.important-ml-3': {
          'margin-left': '0.75rem!important',
        },
        '.important-ml-5': {
          'margin-left': '1.25rem!important',
        },
        '.important-mr-2': {
          'margin-right': '0.5rem!important',
        },
        // ...
      }

      addComponents(buttons)
    }),
  ],
  content: ['./ui/**/*.svelte'],
  // content: {
  //   content: ['./ui/**/*.svelte'],
  //   enabled: production, // disable purge in dev
  //   options: {
  //     defaultExtractor: (content) => [
  //       ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
  //       ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
  //     ],
  //   },
  // },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xsm': '440px',
      },
    },
  },
  variants: {
    extend: {},
  },
}
