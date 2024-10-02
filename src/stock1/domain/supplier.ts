export class Supplier {
    private constructor(
        public id: string,
        public name: string,
    ) {}

    static create(name: string) {
        const id = crypto.randomUUID();
        return new Supplier(id, name);
    }

    static restore(id: string, name: string) {
        return new Supplier(id, name);
    }
}
