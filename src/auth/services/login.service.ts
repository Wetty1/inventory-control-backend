import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/dtos/user-entity';

@Injectable()
export class LoginService {
    constructor(private readonly jwtService: JwtService) {}

    async execute(user: UserModel) {
        const token = this.jwtService.sign({ sub: user.id, email: user.email });

        return { token };
    }
}
