import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class ConnectionFactory implements TypeOrmOptionsFactory {
    constructor() {}

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const host = process.env.DB_HOST;
        const username = process.env.DB_USER;
        const password = process.env.DB_PASS;
        const database = process.env.DB_NAME;
        const port = Number(process.env.DB_PORT) || 5432;

        return {
            type: 'postgres',
            host,
            username,
            password,
            database,
            port,
            synchronize: false,
            logging: false,
            entities: [
                join(__dirname, '..', '..', '..', '**/*.entity{.ts,.js}'),
            ],
        };
    }
}
