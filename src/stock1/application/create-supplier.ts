import { Inject, Injectable } from '@nestjs/common';
import { SupplierRepository } from '../domain/supplier.repository';
import { Supplier } from '../domain/supplier';

interface Input {
    name: string;
}

interface Output {
    id: string;
    name: string;
}

@Injectable()
export class CreateSupplier {
    constructor(
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const supplier = Supplier.create(input.name);
        await this.supplierRepository.save(supplier);
        return {
            id: supplier.id,
            name: supplier.name,
        };
    }
}
