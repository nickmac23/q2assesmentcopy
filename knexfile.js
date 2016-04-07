module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/q24'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  seeds: {
    directory: './seeds/'
  }

};
