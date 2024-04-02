import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../domain/entities/product';
import { CategoryTypeorm } from 'src/stock/categories/infra/typeorm/entities/category.entity';

@Entity('products')
export class ProductTypeorm implements Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    categoryId: number;

    @ManyToOne(() => CategoryTypeorm, (category) => category.products)
    category: CategoryTypeorm;
}
