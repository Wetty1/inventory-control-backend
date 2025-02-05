import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './infra/typeorm/entities/user.entity';
import { UserTypeormRepository } from './infra/typeorm/repositories/user-typeorm.repository';
import { UsersController } from './infra/controllers/users.controller';
import { ChangeUserPassword } from './application/usecase/change-password';
import { CreateUser } from './application/usecase/create-user';
import { GetUser } from './application/usecase/get-user';
import { DesableUserService } from './application/usecase/desable-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserTypeorm])],
    controllers: [UsersController],
    providers: [
        CreateUser,
        ChangeUserPassword,
        {
            provide: 'UserRepository',
            useClass: UserTypeormRepository,
        },
        GetUser,
        DesableUserService,
    ],
    exports: ['UserRepository'],
})
export class UserModule {}
