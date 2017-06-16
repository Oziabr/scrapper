exports.config =
  framework: 'jasmine2'
  specs: [ 'test.js' ]
  capabilities: 'browserName': 'chrome'
  # capabilities: 'browserName': 'phantomjs'
  loggingPrefs:
    'driver': 'SEVERE'
    'server': 'SEVERE'
    'browser': 'SEVERE'
  directConnect: true
  jasmineNodeOpts:
    isVerbose: false
    showColors: true
    includeStackTrace: true
    defaultTimeoutInterval: 15000
    print: ->
  onPrepare: ->
    SpecReporter = require process.env.PWD + '/node_modules/jasmine-spec-reporter'
    jasmine.getEnv().addReporter new SpecReporter.SpecReporter(displayStacktrace: true)
  includeStackTrace: true