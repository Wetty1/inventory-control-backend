export class Category {
    private constructor(
        private id: number | undefined,
        private name: string,
    ) {
        this.id = id;
        this.name = name;
    }

    static create(name: string) {
        return new Category(null, name);
    }

    static restore(id: number, name: string) {
        return new Category(id, name);
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    changeName(name: string) {
        this.name = name;
    }
}
