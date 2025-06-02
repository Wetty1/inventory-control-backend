import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './infra/controllers/auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './infra/strategies/local.strategy';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { Login } from './application/usecase/login';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
            privateKey: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1d' },
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [Login, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
