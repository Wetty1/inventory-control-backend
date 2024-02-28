export class CreateEventDto {
  date: Date;
  productId: number;
  type: 'entrada' | 'saida';
  quantity: number;
}
