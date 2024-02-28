import { Module } from '@nestjs/common';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ConnectionFactory } from './shared/infra/typeorm/connection.factory';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: async (dbProvider: ConnectionFactory) =>
                dbProvider.createTypeOrmOptions(),
            inject: [ConnectionFactory],
        }),
        StockModule,
        AuthModule,
        UserModule,
    ],
    providers: [],
})
export class AppModule {}
