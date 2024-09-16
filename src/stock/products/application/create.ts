import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/product';
import { ProductRepository } from '../domain/product.repository';
import { Category } from 'src/stock/categories/domain/category';

interface Input {
    name: string;
    category: {
        id: string;
        name: string;
    };
}

interface Output {
    id: string;
    name: string;
    categoryId: number;
}

@Injectable()
export class CreateProduct {
    constructor(
        @Inject('ProductRepository')
        private readonly productStore: ProductRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const productFound = await this.productStore.getByName(input.name);
        if (productFound) {
            throw new Error('Product already exists');
        }

        const category: Category = Category.restore(
            input.category.id,
            input.category.name,
        );

        const product = Product.create(input.name, category);

        const createdProduct = await this.productStore.create(product);
        return createdProduct;
    }
}
