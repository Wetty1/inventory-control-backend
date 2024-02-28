export class Event {
  id?: number;
  date: Date;
  productId: number;
  quantity: number;
  type: 'entrada' | 'saida';
}
