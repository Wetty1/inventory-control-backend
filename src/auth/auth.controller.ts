import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginService: LoginService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any) {
        return this.loginService.execute(req.user);
    }
}
