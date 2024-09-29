export class Product {
    private constructor(
        public readonly id: string,
        public name: string,
        public categoryId: string,
    ) {}

    static create(name: string, categoryId: string) {
        const id = crypto.randomUUID();
        return new Product(id, name, categoryId);
    }

    static restore(id: string, name: string, categoryId: string) {
        return new Product(id, name, categoryId);
    }
}
