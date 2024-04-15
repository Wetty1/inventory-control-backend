export class Event {
    id?: number;
    date: Date;
    productId: number;
    purchaseId?: number;
    quantity: number;
    type: 'entrada' | 'saida';
}
