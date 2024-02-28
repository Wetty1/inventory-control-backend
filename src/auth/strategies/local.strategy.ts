import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { compareSync } from 'bcrypt';
import { IUserRepository } from 'src/user/gateways/interfaces/user-repository.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {
        const user = await this.userRepository.getByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        if (!compareSync(password, user.password)) {
            throw new Error('Invalid password');
        }

        return user;
    }
}
