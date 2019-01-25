module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', "react-native-dotenv"],
    "env": {
      "development": {
        "plugins": ["transform-react-jsx-source"]
      }
    },
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          root: ['./src'],
        },
      ],
    ],
  };
};
