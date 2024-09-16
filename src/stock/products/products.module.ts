import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeorm } from './infra/typeorm/entities/product.entity';
import { ProductsController } from './infra/controllers/products.controller';
import { ProductStoreTypeorm } from './infra/typeorm/repositories/product.repository';

import { CreateProduct } from './application/create';
import { DeleteProduct } from './application/delete';
import { UpdateProduct } from './application/update';
import { ListProduct } from './application/list-product';
import { ListProductByCategory } from './application/list-product-by-category';
import { ListExtractProduct } from './application/list-extract-product';
import { GetOneProduct } from './application/get-one-product';
import { ListSummaryProduct } from './application/list-summary-product';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTypeorm])],
    controllers: [ProductsController],
    providers: [
        {
            provide: 'ProductRepository',
            useClass: ProductStoreTypeorm,
        },
        CreateProduct,
        UpdateProduct,
        DeleteProduct,
        ListProduct,
        ListProductByCategory,
        ListExtractProduct,
        GetOneProduct,
        ListSummaryProduct,
    ],
})
export class ProductsModule {}
