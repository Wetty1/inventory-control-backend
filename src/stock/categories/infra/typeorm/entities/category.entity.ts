import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../../domain/entities/category';
import { ProductTypeorm } from 'src/stock/products/infra/typeorm/entities/product.entity';

@Entity('categories')
export class CategoryTypeorm implements Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ProductTypeorm, (product) => product.category)
    products: ProductTypeorm[];
}
