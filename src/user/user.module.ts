import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeUserPassword } from './application/change-password';
import { CreateUser } from './application/create-user';
import { GetByIdService } from './application/get-by-id';
import { UsersController } from './infra/controllers/users.controller';
import { UserTypeorm } from './infra/typeorm/entities/user.entity';
import { UserTypeormRepository } from './infra/typeorm/repositories/user-typeorm.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserTypeorm])],
    controllers: [UsersController],
    providers: [
        CreateUser,
        GetByIdService,
        ChangeUserPassword,
        {
            provide: 'UserRepository',
            useClass: UserTypeormRepository,
        },
    ],
    exports: ['UserRepository'],
})
export class UserModule {}
