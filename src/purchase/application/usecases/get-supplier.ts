import { Inject, Injectable } from '@nestjs/common';
import { SupplierRepository } from 'src/purchase/domain/repository/supplier.repository';

@Injectable()
export class GetSupplier {
    constructor(
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const supplier = await this.supplierRepository.get(input.id);
        if (!supplier) {
            throw new Error('Supplier not found');
        }
        return {
            id: supplier.getId(),
            name: supplier.getName(),
            address: supplier.getAddess(),
            cnpj: supplier.getCnpj(),
        };
    }
}

type Input = {
    id: number;
};

type Output = {
    id: number;
    name: string;
    address: string;
    cnpj: string;
};
