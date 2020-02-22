const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

module.exports.development = {
  dialect: "mysql",
  seederStorage: "heroku_2dd59ff967c8250",
  url: process.env.DB_URL
};

module.exports.production = {
  dialect: "mysql",
  url: process.env.DB_URL
};
