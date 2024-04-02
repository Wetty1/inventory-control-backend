import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeorm } from './infra/typeorm/entities/product.entity';
import { CreateService } from './domain/services/create.service';
import { DeleteService } from './domain/services/delete.service';
import { ReadService } from './domain/services/read.service';
import { UpdateService } from './domain/services/update.service';
import { ProductsController } from './infra/controllers/products.controller';
import { ProductStoreTypeorm } from './infra/typeorm/repositories/product-store-prisma';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTypeorm])],
    controllers: [ProductsController],
    providers: [
        CreateService,
        UpdateService,
        DeleteService,
        ReadService,
        {
            provide: 'ProductRepository',
            useClass: ProductStoreTypeorm,
        },
    ],
})
export class ProductsModule {}
