import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from 'src/user/application/dtos/user-create.dto';
import { ChangeUserPassword } from 'src/user/application/usecase/change-password';
import { CreateUser } from 'src/user/application/usecase/create-user';
import { GetUser } from 'src/user/application/usecase/get-user';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private createUserService: CreateUser,
        private getByIdService: GetUser,
        private changePasswordService: ChangeUserPassword,
    ) {}

    @Post('create')
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
        return this.changePasswordService.execute({
            id: body.id,
            newPassword: body.newPassword,
        });
    }
}
