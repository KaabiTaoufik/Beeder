import { NestFactory } from '@nestjs/core';
import { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { AppModule } from './app.module';
import configuration from './config/configuration';

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

  await createDatabase({
    ifNotExist: true,
    options: options,
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
