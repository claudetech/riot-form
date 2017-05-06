'use strict'

var _ = require('lodash')

var webpackConfig = _(require('./webpack.config'))
      .omit('entry', 'output', 'externals')
      .assign({devtool: 'inline-sourcemap'})
      .value()

module.exports = function (config) {
  config.set({

    frameworks: ['mocha'],

    files: [
      'tests/unit/**/*_test.js'
    ],

    preprocessors: {
      'tests/unit/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Firefox'],

    singleRun: true,

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  })
}
