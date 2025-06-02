import { Inject, Injectable } from '@nestjs/common';
import { Supplier } from 'src/purchase/domain/entity/supplier';
import { SupplierRepository } from 'src/purchase/domain/repository/supplier.repository';

@Injectable()
export class CreateSupplier {
    constructor(
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const supplier = Supplier.create(input.name, input.address, input.cnpj);
        const supplierCreated = await this.supplierRepository.save(supplier);

        return {
            id: supplierCreated.getId(),
            name: supplierCreated.getName(),
            address: supplierCreated.getAddess(),
            cnpj: supplierCreated.getCnpj(),
        };
    }
}

type Input = {
    name: string;
    address: string;
    cnpj: string;
};

type Output = {
    id: number;
    name: string;
    address: string;
    cnpj: string;
};
