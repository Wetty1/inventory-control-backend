import { Purchase } from 'src/purchase/domain/entities/purchase';
import { EventTypeorm } from 'src/stock/events/infra/typeorm/entities/event.entity';
import { ProductTypeorm } from 'src/stock/products/infra/typeorm/entities/product.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('purchases')
export class PurchaseTypeorm implements Purchase {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    date: Date;
    @Column()
    productId: number;
    @Column()
    eventId: number;
    @Column()
    total_value: number;
    @Column()
    unit_value: number;
    @Column()
    quantity: number;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
    @ManyToOne(() => ProductTypeorm, (product) => product.purchases)
    product: ProductTypeorm;
    @OneToOne(() => EventTypeorm, (event) => event.id)
    event?: EventTypeorm;
}
