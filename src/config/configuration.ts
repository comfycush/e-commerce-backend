export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  version: 'v1',

  basicAuth: {
    username: process.env.SWAGGER_AUTH_USERNAME,
    password: process.env.SWAGGER_AUTH_PASSWORD,
  },

  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});
