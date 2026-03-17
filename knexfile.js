const path = require("path");

require("dotenv").config();

const {
  POSTGRES_DATABASE = "postgresql://postgres@127.0.0.1:5432/postgres",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: POSTGRES_DATABASE,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false // This will allow connections without requiring SSL certificates to be valid.
    }
  },

  production: {
    client: "postgresql",
    connection: POSTGRES_DATABASE,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false // This will allow connections without requiring SSL certificates to be valid.
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "test", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "test", "seeds"),
    },
    useNullAsDefault: true,
  },
};
