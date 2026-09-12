module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/**/*.ts'],
    format: ['progress-bar', 'summary', 'html:reports/cucumber-report.html'],
    publishQuiet: true,
    parallel: 1
  }
};

