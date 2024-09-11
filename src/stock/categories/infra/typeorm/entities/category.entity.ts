import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductTypeorm } from 'src/stock/products/infra/typeorm/entities/product.entity';
import { Category } from 'src/stock/categories/domain/category';

@Entity('categories')
export class CategoryTypeorm {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ProductTypeorm, (product) => product.category)
    products: ProductTypeorm[];

    toCategory() {
        return Category.create(this.name);
    }
}
