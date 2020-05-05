const baseConf = require('../karma.base.conf');

module.exports = (config) => {
  config.set({
    ...baseConf,
    coverageIstanbulReporter: {
      ...baseConf.coverageIstanbulReporter,
      dir: require('path').join(__dirname, '..', 'coverage', 'ngx-toast-notifications-app'),
    },
  });
};
