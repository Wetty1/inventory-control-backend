import { Body, Controller, Post } from '@nestjs/common';
import { CreatePurchaseService } from '../domain/services/create-purchase.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('purchase')
@ApiTags('purchase')
export class PurchaseController {
    constructor(
        private readonly createPurchaseService: CreatePurchaseService,
    ) {}

    @Post('create')
    async create(@Body() body: any) {
        return this.createPurchaseService.execute(body);
    }
}
