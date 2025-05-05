import { Product } from 'src/catalog/domain/entity/product';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductTypeorm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    categoryId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    static from(product: Product): ProductTypeorm {
        const productTypeorm = new ProductTypeorm();
        productTypeorm.id = product.getId();
        productTypeorm.name = product.getName();
        productTypeorm.categoryId = product.getCategoryId();
        return productTypeorm;
    }

    static to(productTypeorm: ProductTypeorm): Product {
        const product = Product.restore(
            productTypeorm.id,
            productTypeorm.name,
            productTypeorm.categoryId,
        );
        return product;
    }
}
