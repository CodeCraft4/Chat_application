module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@common': './src/common',
          '@screens': './src/screens',
          '@configs': './src/configs',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@enums': './src/enums',
          '@helpers': './src/helpers',
          '@validations': './src/validations',
          '@hooks': './src/hooks',
          '@modules': './src/modules',
          '@navigations': './src/navigations',
          '@core-ui': './src/core-ui',
          '@types': './src/types',
          '@appServices': './src/appServices',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
