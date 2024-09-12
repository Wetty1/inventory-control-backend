import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/domain/user';

@Injectable()
export class LoginService {
    constructor(private readonly jwtService: JwtService) {}

    async execute(user: User) {
        const token = this.jwtService.sign({ sub: user.id, email: user.email });

        return { token };
    }
}
