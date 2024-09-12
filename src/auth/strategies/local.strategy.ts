import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { compareSync } from 'bcrypt';
import { UserRepository } from '../../user/domain/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
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
