import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserRepository } from '../../domain/repositories/user.repository';
import { ChangePasswordService } from '../../domain/services/change-password.service';
import { CreateUserService } from '../../domain/services/create-user.service';
import { GetByIdService } from '../../domain/services/get-by-id.service';
import { UserMemoryRepository } from '../memory/user-memory-repository';

describe('UsersController', () => {
    let controller: UsersController;
    const userRepository: UserRepository = new UserMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangePasswordService,
                GetByIdService,
                CreateUserService,
                {
                    provide: 'UserRepository',
                    useValue: userRepository,
                },
            ],
            controllers: [UsersController],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
