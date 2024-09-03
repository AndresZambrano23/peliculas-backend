import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'A3103499677cz',
  database: 'peliculas',
  entities: ['dist/src/**/**/*.entity.js'],
  logging: true,
  logger: 'advanced-console',
  synchronize: true,
  migrationsRun: true,
  migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'history',
});
