const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        supportFile: false,
        specPattern: "./e2e/**.cy.js",
    },
    env: {
        baseUrl: "http://localhost:4200",
    },
    fixturesFolder: "./fixtures",
    screenshotsFolder: ".//screenshots",
});
