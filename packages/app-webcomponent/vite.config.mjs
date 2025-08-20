import { defineConfig } from 'vite';
import { extensions, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

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
      },
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
