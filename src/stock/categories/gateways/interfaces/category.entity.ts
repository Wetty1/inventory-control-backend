import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../entities/category';
import { ProductORM } from 'src/stock/products/gateways/interfaces/product.entity';

@Entity('Category')
export class CategoryORM implements Category {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @OneToMany(() => ProductORM, (product) => product.category)
    products: ProductORM[];
}
