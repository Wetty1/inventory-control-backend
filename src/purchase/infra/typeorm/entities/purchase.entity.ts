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
    value: number;
    @Column()
    event_id: number;
    @Column()
    total_value: number;
    @Column()
    unit_value: number;
    @Column()
    quantity: number;
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
}
