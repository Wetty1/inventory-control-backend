import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../entities/product';
import { CategoryORM } from 'src/stock/categories/gateways/interfaces/category.entity';

@Entity('Product')
export class ProductORM implements Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    categoryId: number;

    @ManyToOne(() => CategoryORM, (category) => category.products)
    category: CategoryORM;
}
