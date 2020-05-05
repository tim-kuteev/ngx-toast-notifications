process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = {
  basePath: '',
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-html-reporter'),
    require('karma-coverage-istanbul-reporter'),
    require('@angular-devkit/build-angular/plugins/karma'),
  ],
  client: {
    clearContext: false,
  },
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, 'coverage'),
    reports: ['html', 'lcovonly', 'text-summary'],
    fixWebpackSourcePaths: true,
  },
  reporters: ['progress', 'kjhtml'],
  port: 9876,
  colors: true,
  logLevel: 'INFO',
  autoWatch: true,
  browsers: ['Chrome'],
  customLaunchers: {
    headless: {
      base: 'ChromeHeadless',
      flags: ['--no-sandbox', '--disable-gpu'],
    },
  },
  singleRun: false,
  restartOnFileChange: true,
};
