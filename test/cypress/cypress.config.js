const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        supportFile: false,
        specPattern: "/cypress/e2e/**.cy.js",
    },
    env: {
        baseUrl: "http://frontend_test:4200",
    },
    fixturesFolder: "/cypress/fixtures",
    screenshotsFolder: "/cypress//screenshots",
});
