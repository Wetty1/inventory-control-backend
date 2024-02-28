import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ListService } from '../services/list.service';
import { CreateService } from '../services/create.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { ExtractByProductService } from '../services/extract-by-product.service';
import { GetBalanceByProductService } from '../services/get-balance-by-product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
@UseGuards(AuthGuard('jwt'))
export class EventsController {
    constructor(
        private readonly listService: ListService,
        private readonly createService: CreateService,
        private readonly extractService: ExtractByProductService,
        private readonly getBalanceByProductService: GetBalanceByProductService,
    ) {}

    @Post('create')
    async create(@Body() body: CreateEventDto) {
        return this.createService.execute(body);
    }

    @Get(':id')
    async getSaldo(@Param('id') id) {
        return this.getBalanceByProductService.execute(id);
    }

    @Get('list')
    async list() {
        return this.listService.execute();
    }

    @Get('extract/:productId')
    async extract(@Param('productId') productId: number) {
        return this.extractService.execute(productId);
    }

    @Get('balance/:productId')
    async balance(@Param('productId') productId: number) {
        return this.getBalanceByProductService.execute(productId);
    }
}
