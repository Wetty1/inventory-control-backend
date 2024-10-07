import { Inject } from '@nestjs/common';
import { SupplierRepository } from '../domain/supplier.repository';

export class ListSuppliers {
    constructor(
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
    ) {}

    async execute() {
        const suppliers = await this.supplierRepository.findAll();
        return suppliers;
    }
}
