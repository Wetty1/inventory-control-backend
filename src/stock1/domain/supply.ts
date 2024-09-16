export class Supply {
    private constructor(
        public readonly id: string,
        public name: string,
        public quantity: number,
        public categoryId: string,
    ) {}

    static create(name: string, categoryId: string) {
        const id = crypto.randomUUID();
        return new Supply(id, name, 0, categoryId);
    }

    static restore(
        id: string,
        name: string,
        quantity: number,
        categoryId: string,
    ) {
        return new Supply(id, name, quantity, categoryId);
    }

    incrementQuantity(quantity: number) {
        this.quantity += quantity;
    }
}
