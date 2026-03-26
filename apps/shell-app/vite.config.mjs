import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { DynamicPublicDirectory } from 'vite-multiple-assets';

export default defineConfig({
  publicDir: false,

  plugins: [
    DynamicPublicDirectory([
      'public/**',
      {
        input: 'node_modules/app-webcomponent/dist/assets/**',
        output: 'assets',
      },
    ]),
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
