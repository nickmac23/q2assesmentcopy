module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/q210_b'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  seeds: {
    directory: './seeds/'
  }

};
