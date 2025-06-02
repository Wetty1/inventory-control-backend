import { Supplier } from 'src/purchase/domain/entity/supplier';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('suppliers')
export class SupplierTypeorm {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    cnpj: string;
    @Column()
    address: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    static from(supplier: Supplier): SupplierTypeorm {
        const supplierTypeorm = new SupplierTypeorm();
        supplierTypeorm.id = supplier.getId();
        supplierTypeorm.name = supplier.getName();
        supplierTypeorm.address = supplier.getAddess();
        supplierTypeorm.cnpj = supplier.getCnpj();
        return supplierTypeorm;
    }

    static to(supplier: SupplierTypeorm): Supplier {
        return Supplier.restore(
            supplier.id,
            supplier.name,
            supplier.address,
            supplier.cnpj,
        );
    }
}
