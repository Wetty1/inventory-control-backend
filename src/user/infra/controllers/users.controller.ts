import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ChangeUserPassword } from '../../application/usecases/change-password';
import { CreateUser } from '../../application/usecases/create-user';
import { GetUser } from '../../application/usecases/get-user';
import { UserCreateDto } from '../dtos/user-create.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private createUserService: CreateUser,
        private getUser: GetUser,
        private changePasswordService: ChangeUserPassword,
    ) {}

    @Post('create')
    async create(@Body() body: UserCreateDto) {
        return this.createUserService.execute(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getById(@Param('id') id) {
        return this.getUser.execute(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/reset-password')
    async changePassword(@Body() body) {
        return this.changePasswordService.execute({
            id: body.id,
            newPassword: body.newPassword,
        });
    }
}
