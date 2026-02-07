const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
    e2e: {
        specPattern: "cypress/e2e/features/**/*.feature",
        baseUrl: "http://localhost:8080",

        env: {
            allure: true,
            allureResultsPath: "allure-results"
        },

        async setupNodeEvents(on, config) {

            await addCucumberPreprocessorPlugin(on, config);

            const allureWriter = require("@shelex/cypress-allure-plugin/writer");
            allureWriter(on, config);

            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            return config;
        },

        chromeWebSecurity: false,
        viewportWidth: 1280,
        viewportHeight: 720,
    },
});