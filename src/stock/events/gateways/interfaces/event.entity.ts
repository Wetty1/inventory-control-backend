import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Event } from '../../entities/event';
import { ProductORM } from 'src/stock/products/gateways/interfaces/product.entity';

@Entity('Event')
export class EventTORM implements Event {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;
    @Column()
    productId: number;
    @ManyToOne(() => ProductORM, (product) => product.id)
    product: ProductORM;
    @Column()
    quantity: number;
    @Column()
    type: 'entrada' | 'saida';

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
