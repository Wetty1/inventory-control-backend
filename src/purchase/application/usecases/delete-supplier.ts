import { Inject, Injectable } from '@nestjs/common';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';
import { SupplierRepository } from 'src/purchase/domain/repository/supplier.repository';

@Injectable()
export class DeleteSupplier {
    constructor(
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const { id } = input;

        const supplier = await this.supplierRepository.get(id);
        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const existsSupplier = await this.purchaseRepository.existsSupplier(id);
        if (existsSupplier) {
            throw new Error('Cannot delete supplier with purchases');
        }

        await this.supplierRepository.delete(id);
        return Promise.resolve();
    }
}

type Input = {
    id: number;
};

type Output = void;
