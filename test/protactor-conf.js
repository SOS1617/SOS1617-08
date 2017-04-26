exports.config = {   
    seleniumAddress: 'http://localhost:9515',

    specs: ['T01-loadWage.js','T02-addWage.js'],

    capabilities: {
        'browserName': 'phantomjs'
      }
};