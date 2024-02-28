export class CreateCategoryDto {
  name: string;
}

export class ListCategoryDto {
  page: number;
  limit: number;
  search?: string;
}
