import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { LoginService } from './services/login.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

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
    providers: [LoginService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
