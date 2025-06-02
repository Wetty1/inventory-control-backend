import { Inject, Injectable } from '@nestjs/common';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';

@Injectable()
export class DeletePurchase {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const { id } = input;

        await this.purchaseRepository.delete(id);
    }
}

type Input = {
    id: number;
};

type Output = void;
