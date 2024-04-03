import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangePasswordService } from './domain/services/change-password.service';
import { CreateUserService } from './domain/services/create-user.service';
import { GetByIdService } from './domain/services/get-by-id.service';
import { UsersController } from './infra/controllers/users.controller';
import { UserTypeorm } from './infra/typeorm/entities/user.entity';
import { UserTypeormRepository } from './infra/typeorm/repositories/user-typeorm.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserTypeorm])],
    controllers: [UsersController],
    providers: [
        CreateUserService,
        GetByIdService,
        ChangePasswordService,
        {
            provide: 'UserRepository',
            useClass: UserTypeormRepository,
        },
    ],
    exports: ['UserRepository'],
})
export class UserModule {}
