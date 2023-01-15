export default () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  },
  storageDirectory: process.env.STORAGE_DIRECTORY,
});
