import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Login } from '../../application/usecase/login';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly loginService: Login) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any) {
        return this.loginService.execute(req.user);
    }
}
