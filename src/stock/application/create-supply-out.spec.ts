import { CreateSupplyOut } from './create-supply-out';

describe('CreateSupplyOut', () => {
    const supplyInOut = [
        {
            id: '1',
            supplyId: 'id do arroz',
            quantity: 10,
            date: new Date(),
            type: 'entrada',
        },
        {
            id: '2',
            supplyId: 'id do arroz',
            quantity: 10,
            date: new Date(),
            type: 'entrada',
        },
        {
            id: '3',
            supplyId: 'id do arroz',
            quantity: 5,
            date: new Date(),
            type: 'saida',
        },
    ];

    const supplyInOutRepository = {
        create: () => ({
            id: 'id da saida de estoque',
        }),
        getSupplyInBySupplyId: (supplyId) => {
            return supplyInOut.filter((value) => value.supplyId === supplyId);
        },
    };

    const supplyRepository = {
        get: () => true,
    };

    const createSupplyOut = new CreateSupplyOut(
        supplyInOutRepository,
        supplyRepository,
    );

    it('deve criar uma saida de estoque', async () => {
        const input = {
            supplyId: 'id do arroz',
            quantity: 10,
            date: new Date(),
        };

        const output = await createSupplyOut.execute(input);

        expect(output).toHaveProperty('id');
    });

    it('deve lançar uma exceção caso o estoque seja insuficiente', async () => {
        const input = {
            supplyId: 'id do arroz',
            quantity: 30,
            date: new Date(),
        };

        await expect(() => createSupplyOut.execute(input)).rejects.toThrow(
            new Error('Estoque insuficiente para este insumo'),
        );
    });

    it.todo('deve lançar uma exceção caso o insumo não exista');
});
