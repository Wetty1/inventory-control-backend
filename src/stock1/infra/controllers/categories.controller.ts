import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    constructor() {}

    @Get()
    async list() {}
}
