import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateService } from '../../domain/services/create.service';
import { ExtractByProductService } from '../../domain/services/extract-by-product.service';
import { GetBalanceByProductService } from '../../domain/services/get-balance-by-product.service';
import { ListService } from '../../domain/services/list.service';
import { DeleteEventService } from '../../domain/services/delete-event.service';
import { UpdateEventService } from '../../domain/services/update-event.service';

@Controller('stock/events')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stock-Events')
export class EventsController {
    constructor(
        private readonly listService: ListService,
        private readonly createService: CreateService,
        private readonly extractService: ExtractByProductService,
        private readonly getBalanceByProductService: GetBalanceByProductService,
        private readonly deleteEventService: DeleteEventService,
        private readonly updateEventService: UpdateEventService,
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

    @Put('update/:id')
    async update(@Param('id') id, @Body() body) {
        return this.updateEventService.execute(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return this.deleteEventService.execute(id);
    }
}
