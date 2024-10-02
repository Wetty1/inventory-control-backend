import { Test } from '@nestjs/testing';
import { SupplierInMemoryRepository } from '../infra/database/in-memory/supplier.repository';
import { ListSupplier } from './list-suppliers';
import { Supplier } from '../domain/supplier';

describe('ListSupplier', () => {
    let service: ListSupplier;
    const supplierRepository = new SupplierInMemoryRepository();
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ListSupplier,
                {
                    provide: 'SupplierRepository',
                    useValue: supplierRepository,
                },
            ],
        }).compile();

        service = module.get<ListSupplier>(ListSupplier);
    });

    it('deve retornar uma lista de fornecedores', async () => {
        supplierRepository.save(Supplier.create('Fornecedor 1'));
        const result = await service.execute();
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name', 'Fornecedor 1');
    });
});
