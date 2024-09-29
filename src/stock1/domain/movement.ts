import { Supply } from './supply';

export class Movement {
    private constructor(
        public readonly id: string,
        public date: Date,
        public supply: Supply,
        public quantity: number,
        public type: 'out' | 'in',
    ) {}

    static create(
        date: Date,
        supply: Supply,
        quantity: number,
        type: 'out' | 'in',
    ) {
        const id = crypto.randomUUID();
        return new Movement(id, date, supply, quantity, type);
    }

    static restore(
        id: string,
        date: Date,
        supply: Supply,
        quantity: number,
        type: 'out' | 'in',
    ) {
        return new Movement(id, date, supply, quantity, type);
    }

    changeQuantity(quantity: number) {
        if (this.type === 'out') {
            if (this.quantity - quantity < 0) {
                throw new Error('Insuficent quantity');
            }
        }
        this.quantity = quantity;
    }

    change(type: 'out' | 'in', supply: Supply, date: Date) {
        this.type = type;
        this.supply = supply;
        this.date = date;
    }
}
