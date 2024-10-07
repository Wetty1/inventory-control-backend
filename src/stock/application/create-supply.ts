import { Supply } from '../domain/supply';
import { SupplyRepository } from '../domain/supply.repository';

interface Input {
    name: string;
    categoryId: string;
}

interface Output {
    id: string;
    name: string;
}

export class CreateSupply {
    constructor(private readonly supplyRepository: SupplyRepository) {}

    async execute(input: Input): Promise<Output> {
        const supply = Supply.create(input.name, input.categoryId);
        const supplyCreated = await this.supplyRepository.save(supply);
        return { id: supplyCreated.id, name: supplyCreated.name };
    }
}
