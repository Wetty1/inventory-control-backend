import { Revenue } from 'src/revenue/domain/entity/revenue';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('revenue')
export class RevenueTypeorm {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'float', precision: 10, scale: 2 })
    value: number;
    @Column()
    date: Date;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;

    static to(revenueTypeorm: RevenueTypeorm): Revenue {
        return Revenue.restore(
            revenueTypeorm.id,
            revenueTypeorm.value,
            revenueTypeorm.date,
        );
    }

    static from(revenue: Revenue): RevenueTypeorm {
        const revenueTypeorm = new RevenueTypeorm();
        revenueTypeorm.id = revenue.getId();
        revenueTypeorm.value = revenue.getValue();
        revenueTypeorm.date = revenue.getDate();
        return revenueTypeorm;
    }
}
