import { Purchase } from 'src/purchase/domain/entities/purchase';
import {
    Column,
    CreateDateColumn,
    Entity,
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
    total_value: number;
    @Column()
    unit_value: number;
    @Column()
    quantity: number;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
}
