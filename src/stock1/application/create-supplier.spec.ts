import { Test } from '@nestjs/testing';
import { CreateSupplier } from './create-supplier';

describe('CreateSupplier', () => {
    let service: CreateSupplier;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [CreateSupplier],
        }).compile();

        service = module.get<CreateSupplier>(CreateSupplier);
    });

    it('deve criar um fornecedor', async () => {
        const input = {
            name: 'Fornecedor 1',
        };
        const result = await service.execute(input);

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name', 'Fornecedor 1');
    });

    it('deve retornar um erro se o nome do fornecedor for vazio', async () => {
        const input = {
            name: '',
        };
        await expect(service.execute(input)).rejects.toThrow();
    });
});
