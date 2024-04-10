import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../../domain/entities/product';
import { CategoryTypeorm } from 'src/stock/categories/infra/typeorm/entities/category.entity';
import { EventTypeorm } from 'src/stock/events/infra/typeorm/entities/event.entity';

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

    @OneToMany(() => EventTypeorm, (event) => event.product)
    events: EventTypeorm[];
}
