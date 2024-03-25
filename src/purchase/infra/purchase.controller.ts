import { Body, Controller, Post } from '@nestjs/common';
import { CreatePurchaseService } from '../domain/services/create-purchase.service';

@Controller('purchase')
export class PurchaseController {
    constructor(
        private readonly createPurchaseService: CreatePurchaseService,
    ) {}

    @Post()
    async create(@Body() body: any) {
        return this.createPurchaseService.execute(body);
    }
}
