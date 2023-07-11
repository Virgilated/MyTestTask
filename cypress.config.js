const { defineConfig } = require('cypress');

module.exports = defineConfig({
   reporter: `cypress-mochawesome-reporter`,
   reporterOptions: {
      videoOnFailOnly: true,
      autoOpen: true,
      embeddedScreenshots: true,
      inlineAssets: true,
   },
   viewportHeight: 1080,
   viewportWidth: 1920,
   e2e: {
      setupNodeEvents(on, config) {
         // implement node event listeners here
         require(`cypress-mochawesome-reporter/plugin`)(on);
      },
      baseUrl: 'https://rozetka.com.ua/ua/',
      testIsolation: false,
      defaultCommandTimeout: 15000,
   },
});
