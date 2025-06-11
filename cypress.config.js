
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000/', 
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
};