export class Revenue {
    private constructor(
        private readonly id: number | undefined,
        private value: number,
        private date: Date,
    ) {}

    static create(value: number, date: Date) {
        if (!value || !date) {
            throw new Error('Revenue invalid');
        }

        if (value <= 0) {
            throw new Error('Value must be greater than zero');
        }
        return new Revenue(null, value, date);
    }

    static restore(id: number, value: number, date: Date) {
        return new Revenue(id, value, date);
    }

    getId() {
        return this.id;
    }

    getValue() {
        return this.value;
    }

    getDate() {
        return this.date;
    }
}
