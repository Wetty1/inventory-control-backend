import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { ChangePasswordService } from '../services/change-password.service';
import { CreateUserService } from '../services/create-user.service';
import { GetByIdService } from '../services/get-by-id.service';
import { UserMemoryRepository } from '../gateways/implementations/user-memory-repository';
import { IUserRepository } from '../gateways/interfaces/user-repository.interface';

describe('UsersController', () => {
    let controller: UsersController;
    const userRepository: IUserRepository = new UserMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangePasswordService,
                GetByIdService,
                CreateUserService,
                {
                    provide: 'IUserRepository',
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
