module.exports = {
    client: 'sqlite3',
    connection: {
      filename: "./src/database/database.sqlite"
    },
    migrations: {
        tableName: 'migrations',
        directory: `${__dirname}/src/database/migrations`
      }
  }
