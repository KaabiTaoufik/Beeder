import { NestFactory } from '@nestjs/core';
import { DataSourceOptions } from 'typeorm';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { createDatabaseWithRetries } from './util/database';
import { createImagesDirectory } from './util/storage';

async function bootstrap() {
  //create database if it does not exist
  const { database } = configuration();
  const options: DataSourceOptions = {
    type: database.type as 'mysql' | 'postgres',
    database: database.database,
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
  };

  await createDatabaseWithRetries({
    ifNotExist: true,
    options: options,
  });

  createImagesDirectory();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  /*app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
    }),
  );*/
  await app.listen(3000);
}
bootstrap();
