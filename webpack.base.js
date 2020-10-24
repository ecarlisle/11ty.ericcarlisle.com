// Native Node modules.
const path = require('path')

// Webpack plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const paths = {
  base: '.',
  scss: path.resolve('.', '_scss'),
  dist: path.resolve('.', 'css')
}

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/main.css'
  })],
  entry: {
    main: [
      path.resolve(paths.scss, 'main.scss')
    ]
  },
  output: {
    filename: 'js/[name].js'
    // publicPath: 'https://www.ericcarlisle.com/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer'], ['cssnano']]
              }
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {}
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers')
              }
            }
          }
        ]
      }
    ]
  }
}
