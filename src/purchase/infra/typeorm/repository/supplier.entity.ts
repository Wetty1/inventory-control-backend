import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierTypeorm } from '../entities/supplier.entity';
import { Repository } from 'typeorm';
import { SupplierRepository } from 'src/purchase/domain/repository/supplier.repository';
import { Supplier } from 'src/purchase/domain/entity/supplier';

@Injectable()
export class SupplierTypeormRepository implements SupplierRepository {
    constructor(
        @InjectRepository(SupplierTypeorm)
        private readonly repository: Repository<SupplierTypeorm>,
    ) {}

    async save(supplier: Supplier): Promise<Supplier> {
        const supplierTypeorm = SupplierTypeorm.from(supplier);
        const supplierSaved = await this.repository.save(supplierTypeorm);
        return SupplierTypeorm.to(supplierSaved);
    }
    async findAll(): Promise<Supplier[]> {
        throw new Error('Method not implemented.');
    }
    async get(id: number): Promise<Supplier> {
        const supplierTypeorm = await this.repository.findOne({
            where: { id },
        });
        return SupplierTypeorm.to(supplierTypeorm);
    }
}
