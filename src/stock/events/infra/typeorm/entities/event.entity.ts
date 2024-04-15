import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Event } from '../../../domain/entities/event';
import { ProductTypeorm } from '../../../../products/infra/typeorm/entities/product.entity';
import { PurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/purchase.entity';

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
    purchaseId?: number;
    @OneToOne(() => PurchaseTypeorm, (purchase) => purchase.id)
    @JoinColumn()
    purchase?: PurchaseTypeorm;
    @Column()
    quantity: number;
    @Column()
    type: 'entrada' | 'saida';
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
