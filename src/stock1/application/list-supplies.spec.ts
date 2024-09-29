import { Test, TestingModule } from '@nestjs/testing';
import { ListSupplies } from './list-supplies';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';
import { Supply } from '../domain/supply';

describe('ListSupplyService', () => {
    let service: ListSupplies;
    const supplyRepository = new SupplyInMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListSupplies,
                {
                    provide: 'SupplyRepository',
                    useValue: supplyRepository,
                },
            ],
        }).compile();

        service = module.get<ListSupplies>(ListSupplies);
    });

    it('deve listar os insumos registrados', async () => {
        await supplyRepository.save(Supply.create('arroz', 'id da categoria'));
        await supplyRepository.save(
            Supply.create('arroz branco', 'id da categoria'),
        );
        const output = await service.execute();
        expect(output).toHaveLength(2);
    });
});
