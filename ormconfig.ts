import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '123456',
    database: process.env.DB_NAME || 'postgres',
    synchronize: false,
    logging: false,
    entities: [__dirname + '/src/modules/**/infra/typeorm/entities/*{.js,.ts}'],
    migrations: [__dirname + '/src/shared/infra/typeorm/migrations/*{.js,.ts}'],
});
