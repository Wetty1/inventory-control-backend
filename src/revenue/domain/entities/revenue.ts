export class Revenue {
    id: number;
    value: number;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(id: number, value: number, date: Date) {
        this.id = id;
        this.value = value;
        this.date = date;

        if (!id || !value || !date) {
            throw new Error('Revenue invalid');
        }

        if (value <= 0) {
            throw new Error('Value must be greater than zero');
        }
    }
}
