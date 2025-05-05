export class Product {
    private constructor(
        private readonly id: number | undefined,
        private name: string,
        private categoryId: number,
    ) {}

    static create(name: string, categoryId: number) {
        return new Product(null, name, categoryId);
    }

    static restore(id: number, name: string, categoryId: number) {
        return new Product(id, name, categoryId);
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getCategoryId() {
        return this.categoryId;
    }
}
