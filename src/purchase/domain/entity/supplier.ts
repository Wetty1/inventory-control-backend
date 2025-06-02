export class Supplier {
    private constructor(
        private id: number | undefined,
        private name: string,
        private address?: string,
        private cnpj?: string,
    ) {}

    static create(name: string, address: string, cnpj: string) {
        return new Supplier(null, name, address, cnpj);
    }

    static restore(id: number, name: string, address: string, cnpj: string) {
        return new Supplier(id, name, address, cnpj);
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getAddess() {
        return this.address;
    }

    getCnpj() {
        return this.cnpj;
    }
}
