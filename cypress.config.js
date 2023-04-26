const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://react-redux.realworld.io/",
    "includeShadowDom": true,
    "chromeWebSecurity": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
