interface Input {
    supplyId: string;
    quantity: number;
    date: Date;
}

export class CreateSupplyOut {
    constructor(
        private readonly supplyInOutRepository,
        private readonly supplyRepository,
    ) {}

    async execute(input: Input) {
        const supply = this.supplyRepository.get(input.supplyId);
        if (!supply) {
            throw new Error('Supply not found');
        }

        const listSupplyIn: Array<any> =
            this.supplyInOutRepository.getSupplyInBySupplyId(input.supplyId);

        const totalQuantity = listSupplyIn.reduce((acc, supplyInOut) => {
            if (supplyInOut.type === 'entrada') {
                return acc + supplyInOut.quantity;
            }
            return acc - supplyInOut.quantity;
        }, 0);

        if (totalQuantity < input.quantity)
            throw new Error('Estoque insuficiente para este insumo');

        const output = this.supplyInOutRepository.create(input);
        return output;
    }
}
