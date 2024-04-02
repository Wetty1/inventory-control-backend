import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Event } from '../../../domain/entities/event';
import { ProductTypeorm } from '../../../../products/infra/typeorm/entities/product.entity';

@Entity('events')
export class EventTypeorm implements Event {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;
    @Column()
    productId: number;
    @ManyToOne(() => ProductTypeorm, (product) => product.id)
    product: ProductTypeorm;
    @Column()
    quantity: number;
    @Column()
    type: 'entrada' | 'saida';
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
