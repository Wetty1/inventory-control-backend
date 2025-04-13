import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Login {
    constructor(private readonly jwtService: JwtService) {}

    async execute(input: Input) {
        const token = this.jwtService.sign({
            sub: input.id,
            email: input.email,
        });

        return { token };
    }
}

type Input = {
    id: number;
    email: string;
};
