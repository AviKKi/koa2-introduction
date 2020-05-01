const CONFIG = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  migrations: {
    directory: ['db/migrations']
  },
  useNullAsDefault: false,
}

module.exports = CONFIG