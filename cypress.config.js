const { defineConfig } = require("cypress");
const { Client } = require ('pg')
module.exports = defineConfig({
  projectId: 'n2kn98',
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query) {
          const client = new Client({
            type: "postgres",
            host: "dpg-cqpquu08fa8c73ela6k0-a.oregon-postgres.render.com",
            port: 5432,
            user: "pushingit",
            password: "giwr2L3OehdWeYdYb9nIMfJS2AcbJBno",
            database: "pushingit_0mjd",
            ssl: true,
          });
          await client.connect();
          const res = await client.query(query);
          await client.end();
          return res.rows;
        },
      });
    },
    
    
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    fixturesFolder: 'cypress/e2e/',
    env: {
      username: "pushingit",
      password: "123456!",
      baseUrlAPI: 'https://pushing-it.onrender.com/api',
      token: ''
    },
  },
  })

