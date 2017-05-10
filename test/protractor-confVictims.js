exports.config = {   
    seleniumAddress: 'http://localhost:9515',

    specs: ['T01-LoadVictims.js','T02-AddVictims.js'],

    capabilities: {
        'browserName': 'phantomjs'
      }
};