exports.config = {   
    seleniumAddress: 'http://localhost:9515',

    specs: ['T01-LoadWages.js','T02-AddWages.js'],

    capabilities: {
        'browserName': 'phantomjs'
      }
};