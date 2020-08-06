const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: (config) => {
    // Support Typescript.
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      include: [
        path.resolve(__dirname, '..', 'src'),
        path.resolve(__dirname, '..', 'stories')
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
