require("dotenv").config()
const Sequelize = require("sequelize")

const maxPoolConnections = Number(process.env.MAX_POOL_CONNECTIONS) || 5
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "127.0.0.1",
        dialect: "mysql",
        port: 3306,
        pool: {
          max: maxPoolConnections,// maximum number of connections in the pool
          min: 0, // minimum number of connections in the pool
          acquire: 30000, // maximum time (in milliseconds) that a connection can be idle before being released
          idle: 10000, // maximum time (in milliseconds) that a connection can be idle before being closed
        },
      }
    )

module.exports = sequelize
