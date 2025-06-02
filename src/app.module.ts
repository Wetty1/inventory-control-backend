import { Module, Scope } from '@nestjs/common';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './@shared/shared.module';
import { ConnectionFactory } from './@shared/infra/typeorm/connection.factory';
import { UserModule } from './user/user.module';
import { RevenueModule } from './revenue/revenue.module';
import { OrderModule } from './order/order.module';
import { LoggingInterceptor } from './@shared/interceptors/logging.interceptor';
import { CatalogModule } from './catalog/catalog.module';
import { CreatePurchaseService } from './purchase/application/usecases/create-purchase/create-purchase.service';
import { PurchaseModule } from './purchase/purchase.module';
import { DeleteItemPurchaseService } from './src/purchase/application/usecases/delete-item-purchase/delete-item-purchase.service';

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
        RevenueModule,
        OrderModule,
        CatalogModule,
        PurchaseModule,
    ],
    providers: [
        {
            provide: 'APP_INTERCEPTOR',
            scope: Scope.REQUEST,
            useClass: LoggingInterceptor,
        },
        CreatePurchaseService,
        DeleteItemPurchaseService,
    ],
})
export class AppModule {}
