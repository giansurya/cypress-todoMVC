const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //This setting is to make Cypress does not alter the current browser context - Gian
    testIsolation: false,
    //
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
