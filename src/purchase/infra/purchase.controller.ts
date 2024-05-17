import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePurchaseService } from '../domain/services/create-purchase.service';
import { ApiTags } from '@nestjs/swagger';
import { ListPurchaseService } from '../domain/services/list-purchase.service';

@Controller('purchase')
@ApiTags('purchase')
export class PurchaseController {
    constructor(
        private readonly createPurchaseService: CreatePurchaseService,
        private readonly listPurchaseService: ListPurchaseService,
    ) {}

    @Post('create')
    async create(@Body() body: any) {
        return this.createPurchaseService.execute(body);
    }

    @Get()
    async list() {
        return this.listPurchaseService.execute();
    }
}
