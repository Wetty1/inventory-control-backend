import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConnectionFactory implements TypeOrmOptionsFactory {
    constructor() {}

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const host = process.env.DB_HOST;

        const username = process.env.DB_USER;
        const password = process.env.DB_PASS;

        const database = process.env.DB_NAME;

        return {
            type: 'postgres',
            host,
            username,
            password,
            database,
            port: 5432,
            synchronize: false,
            logging: false,
            entities: ['dist/**/*.entity{.ts,.js}'],
        };
    }
}
