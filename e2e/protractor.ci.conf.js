const baseConf = require('./protractor.conf').config;

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  ...baseConf,
  capabilities: {
    ...baseConf.capabilities,
    chromeOptions: {
      ...baseConf.capabilities.chromeOptions,
      args: ['--headless', '--no-sandbox', '--disable-gpu'],
    },
  },
};
