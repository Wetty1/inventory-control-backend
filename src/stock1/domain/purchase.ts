import { Movement } from './movement';
import { Supplier } from './supplier';
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
        public supplier: Supplier,
    ) {}

    static create(
        date: Date,
        supply: Supply,
        quantity: number,
        unitValue: number,
        supplier: Supplier,
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
            supplier,
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
        supplier: Supplier,
    ) {
        return new Purchase(
            id,
            date,
            supply,
            movement,
            quantity,
            unitValue,
            totalValue,
            supplier,
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
