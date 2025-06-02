import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './infra/typeorm/entities/user.entity';
import { UserTypeormRepository } from './infra/typeorm/repositories/user-typeorm.repository';
import { UsersController } from './infra/controllers/users.controller';
import { ChangeUserPassword } from './application/usecases/change-password';
import { CreateUser } from './application/usecases/create-user';
import { GetUser } from './application/usecases/get-user';
import { DesableUser } from './application/usecases/desable-user';

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
        DesableUser,
    ],
    exports: ['UserRepository'],
})
export class UserModule {}
