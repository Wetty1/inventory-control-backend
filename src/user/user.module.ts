import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user.service';
import { ChangePasswordService } from './services/change-password.service';
import { GetByIdService } from './services/get-by-id.service';
import { UserTypeormRepository } from './gateways/implementations/user-typeorm-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from './gateways/interfaces/user-typeorm.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserTypeormEntity])],
    controllers: [UsersController],
    providers: [
        CreateUserService,
        GetByIdService,
        ChangePasswordService,
        {
            provide: 'IUserRepository',
            useClass: UserTypeormRepository,
        },
    ],
    exports: ['IUserRepository'],
})
export class UserModule {}
