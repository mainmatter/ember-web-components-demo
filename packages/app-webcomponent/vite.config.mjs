import { defineConfig } from 'vite';
import { extensions, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { shadowStyle } from './plugin.js';

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // this is to prevent fingerprinting the app.js
        entryFileNames: '[name].js',
      },
      input: {
        'web-component': 'web-component.js',
        /**
         * usually you would have this be conditional based on the mode that you're running in but I couldn't
         * find a way to access the mode early enough here. I reasoned that it was probably good enough to
         * always include 👍
         */
        tests: 'tests/index.html',
        index: 'index.html',
      },
      plugins: [shadowStyle()],
    },
  },
  plugins: [
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
