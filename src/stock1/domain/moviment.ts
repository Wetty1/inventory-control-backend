import { Supply } from './supply';

export class Moviment {
    private constructor(
        public readonly id: string,
        public readonly date: Date,
        public readonly supply: Supply,
        public readonly quantity: number,
        public readonly type: 'out' | 'in',
    ) {}

    static create(
        date: Date,
        supply: Supply,
        quantity: number,
        type: 'out' | 'in',
    ) {
        const id = crypto.randomUUID();
        return new Moviment(id, date, supply, quantity, type);
    }

    static restore(
        id: string,
        date: Date,
        supply: Supply,
        quantity: number,
        type: 'out' | 'in',
    ) {
        return new Moviment(id, date, supply, quantity, type);
    }
}
