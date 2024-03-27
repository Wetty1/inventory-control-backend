import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChangePasswordService } from '../services/change-password.service';
import { CreateUserService } from '../services/create-user.service';
import { GetByIdService } from '../services/get-by-id.service';
import { UserCreateDto } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private createUserService: CreateUserService,
        private getByIdService: GetByIdService,
        private changePasswordService: ChangePasswordService,
    ) {}

    @Post()
    async create(@Body() body: UserCreateDto) {
        return this.createUserService.execute(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getById(@Param('id') id) {
        return this.getByIdService.execute(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/reset-password')
    async changePassword(@Body() body) {
        return this.changePasswordService.execute(body.id, body.newPassword);
    }
}
