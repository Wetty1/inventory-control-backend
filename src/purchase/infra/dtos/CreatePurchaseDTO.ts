export interface CreatePurchaseDTO {
    date: Date;
    productId: number;
    eventId?: number;
    quantity: number;
    total_value: number;
    unit_value: number;
}
