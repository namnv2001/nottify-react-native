module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './assets',
            components: './src/components',
            screens: './src/screens',
            patterns: './src/patterns',
            hooks: './src/hooks',
            context: './src/context',
            misc: './src/misc',
            helpers: './src/helpers',
            navigation: './src/navigation',
          },
        },
      ],
    ],
  }
}
