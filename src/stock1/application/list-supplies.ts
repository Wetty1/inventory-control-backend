import { Inject, Injectable } from '@nestjs/common';
import { SupplyRepository } from '../domain/supply.repository';

@Injectable()
export class ListSupplies {
    constructor(
        @Inject('SupplyRepository')
        private readonly supplyRepository: SupplyRepository,
    ) {}

    async execute() {
        return await this.supplyRepository.list();
    }
}
