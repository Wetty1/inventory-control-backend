import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';
import { ReadService } from './services/read.service';
import { ProductStoreTypeorm } from './gateways/implementations/product-store-prisma';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductORM } from './gateways/interfaces/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductORM])],
  controllers: [ProductsController],
  providers: [
    CreateService,
    UpdateService,
    DeleteService,
    ReadService,
    {
      provide: 'ProductStoreGateway',
      useClass: ProductStoreTypeorm,
    },
  ],
})
export class ProductsModule {}
