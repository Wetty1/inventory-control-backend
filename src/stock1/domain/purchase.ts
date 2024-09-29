import { Movement } from './movement';
import { Supply } from './supply';

export class Purchase {
    private constructor(
        public readonly id: string,
        public date: Date,
        public supply: Supply,
        public readonly movement: Movement,
        public quantity: number,
        public unitValue: number,
        public totalValue: number,
    ) {}

    static create(
        date: Date,
        supply: Supply,
        quantity: number,
        unitValue: number,
    ) {
        const id = crypto.randomUUID();
        const movement = Movement.create(date, supply, quantity, 'in');
        const totalValue = quantity * unitValue;

        return new Purchase(
            id,
            date,
            supply,
            movement,
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
        movement: Movement,
        unitValue: number,
        totalValue: number,
    ) {
        return new Purchase(
            id,
            date,
            supply,
            movement,
            quantity,
            unitValue,
            totalValue,
        );
    }

    change(quantity: number, unitValue: number, date: Date) {
        this.quantity = quantity;
        this.unitValue = unitValue;
        this.date = date;

        this.totalValue = quantity * unitValue;
    }

    changeSupply(supply: Supply) {
        this.supply = supply;
    }
}
