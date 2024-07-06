const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
const {removeDirectory} = require('cypress-delete-downloads-folder');

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
    setupNodeEvents(on, config) {
        // implement node event listeners here
        on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
        });
        on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
        });
        on('task', {downloadFile}),
        on('task', {removeDirectory})
        on('before:browser:launch', (browser = {}, launchOptions) => {
            if (browser.name === 'chrome' || browser.name === 'chromium') {
                launchOptions.args.push('--lang=es');
            }
            return launchOptions;
        });
    },
    chromeWebSecurity: false,
    env: {
        USERNAME: 'username',
        USER_PASSWORD: 'user_password'
    },
    retries:{
        runMode: 3
    },
    redirectionLimit: 55,
    screenshotOnRunFailure: false, // No tomar capturas de pantalla
    video: false, // No grabar videos
    numTestsKeptInMemory: 1, // Mantener solo la prueba actual en memoria
    requestTimeout: 15000,
    }
});
