import { Moviment } from './moviment';
import { Supply } from './supply';

export class Purchase {
    private constructor(
        public readonly id: string,
        public readonly date: Date,
        public readonly supply: Supply,
        public readonly moviment: Moviment,
        public readonly quantity: number,
        public readonly unitValue: number,
        public readonly totalValue: number,
    ) {}

    static create(
        date: Date,
        supply: Supply,
        quantity: number,
        unitValue: number,
    ) {
        const id = crypto.randomUUID();
        const moviment = Moviment.create(date, supply, quantity, 'in');
        const totalValue = quantity * unitValue;

        return new Purchase(
            id,
            date,
            supply,
            moviment,
            quantity,
            unitValue,
            totalValue,
        );
    }

    static restore(
        id: string,
        date: Date,
        supply: Supply,
        quantity: number,
        moviment: Moviment,
        unitValue: number,
        totalValue: number,
    ) {
        return new Purchase(
            id,
            date,
            supply,
            moviment,
            quantity,
            unitValue,
            totalValue,
        );
    }
}
