import { Module, Scope } from '@nestjs/common';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './@shared/shared.module';
import { ConnectionFactory } from './@shared/infra/typeorm/connection.factory';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { RevenueModule } from './revenue/revenue.module';
import { OrderModule } from './order/order.module';
import { LoggingInterceptor } from './@shared/interceptors/logging.interceptor';

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
        PurchaseModule,
        RevenueModule,
        OrderModule,
    ],
    providers: [
        {
            provide: 'APP_INTERCEPTOR',
            scope: Scope.REQUEST,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule {}
