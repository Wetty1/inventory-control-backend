import { Revenue } from 'src/revenue/domain/entities/revenue';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('revenue')
export class RevenueTypeorm implements Revenue {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ type: 'float', precision: 10, scale: 2 })
    value: number;
    @Column()
    date: Date;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
}
