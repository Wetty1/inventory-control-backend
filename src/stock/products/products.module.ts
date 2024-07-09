import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeorm } from './infra/typeorm/entities/product.entity';
import { CreateService } from './domain/services/create.service';
import { DeleteProductService } from './domain/services/delete.service';
import { UpdateService } from './domain/services/update.service';
import { ProductsController } from './infra/controllers/products.controller';
import { ProductStoreTypeorm } from './infra/typeorm/repositories/product-store-prisma';
import { ListProductService } from './domain/services/list-product.service';
import { ListProductByCategoryService } from './domain/services/list-product-by-category.service';
import { ListExtractProductService } from './domain/services/list-extract-product.service';
import { GetOneProductService } from './domain/services/get-one-product.service';
import { ListSummaryProductService } from './domain/services/list-summary-product.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTypeorm])],
    controllers: [ProductsController],
    providers: [
        {
            provide: 'ProductRepository',
            useClass: ProductStoreTypeorm,
        },
        CreateService,
        UpdateService,
        DeleteProductService,
        ListProductService,
        ListProductByCategoryService,
        ListExtractProductService,
        GetOneProductService,
        ListSummaryProductService,
    ],
})
export class ProductsModule {}
