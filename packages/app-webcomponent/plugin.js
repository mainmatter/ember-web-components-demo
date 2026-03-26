// inspired by https://github.com/hood/vite-plugin-shadow-style
export function shadowStyle() {
  return {
    name: 'ember-shadow-style',
    config(userConfig, env) {
      if (env.command === 'build') {
        if (!userConfig.build) {
          userConfig.build = {};
        }

        if (userConfig.build.cssCodeSplit) {
          throw new Error(
            `'build.cssCodeSplit' option is set to true, it must be false.`
          );
        }
      }
    },

    async generateBundle(normalizedOutputOptions, outputBundle) {
      const cssFiles = Object.entries(outputBundle)
        .filter(([filename, asset]) => {
          return filename.endsWith('.css') && asset.type === 'asset';
        })
        .map(([filename]) => filename);

      Object.entries(outputBundle).forEach(([filename, asset]) => {
        if (!filename.endsWith('.js') || asset.type !== 'chunk') {
          return false;
        }

        if (asset.code.includes('SHADOW_STYLE_URLS')) {
          asset.code = asset.code.replace(
            'SHADOW_STYLE_URLS',
            JSON.stringify(cssFiles)
          );
        }
      });
    },
  };
}
