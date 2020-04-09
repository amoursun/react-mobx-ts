
module.exports = {
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        'targets': {
          'node': '6',
          'browsers': ['ie>=9']
        },
        "loose": false,
        "modules": false,
        "useBuiltIns": true
      }
    ],
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-lodash'),
    require.resolve('babel-plugin-transform-export-extensions'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties'),
    [
      require.resolve('babel-plugin-transform-runtime'),
      {
        polyfill: false,
        regenerator: true
      }
    ],
    require.resolve('react-hot-loader/babel'),
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
};
