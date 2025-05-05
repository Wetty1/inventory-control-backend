import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { ProductTypeorm } from './infra/typeorm/entities/product.entity';
import { CategoryTypeorm } from './infra/typeorm/entities/category.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: async (dbProvider: ConnectionFactory) =>
                dbProvider.createTypeOrmOptions(),
            inject: [ConnectionFactory],
        }),
        TypeOrmModule.forFeature([ProductTypeorm, CategoryTypeorm]),
    ],
})
export class CatalogModule {}
