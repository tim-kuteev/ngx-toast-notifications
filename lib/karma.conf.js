module.exports = function (config) {
  const baseConf = require('../karma.conf');
  const conf = {
    ...baseConf,
    basePath: 'src',
    logLevel: config.LOG_INFO,
    coverageIstanbulReporter: {
      ...baseConf.coverageIstanbulReporter,
      dir: require('path').join(__dirname, '..', 'coverage', 'ngx-toast-notifications'),
    },
  };
  config.set(conf);
};
