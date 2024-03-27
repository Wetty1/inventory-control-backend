export interface Purchase {
    id?: number;
    date: Date;
    productId: number;
    quantity: number;
    unit_value: number;
    total_value: number;
    createdAt?: Date;
    updatedAt?: Date;
}
