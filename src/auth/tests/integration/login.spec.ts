import { Test, TestingModule } from '@nestjs/testing';
import { Login } from '../../application/usecase/login';
import { JwtModule } from '@nestjs/jwt';
import { CreateUser } from 'src/user/application/usecase/create-user';
import { UserTypeormRepository } from 'src/user/infra/typeorm/repositories/user-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from 'src/user/infra/typeorm/entities/user.entity';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';

describe('Login', () => {
    let service: Login;
    let createUser: CreateUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    privateKey: process.env.SECRET_KEY,
                    signOptions: { expiresIn: '1d' },
                }),
                TypeOrmModule.forRootAsync({
                    imports: [SharedModule],
                    useFactory: async (dbProvider: ConnectionFactory) =>
                        dbProvider.createTypeOrmOptions(),
                    inject: [ConnectionFactory],
                }),
                TypeOrmModule.forFeature([UserTypeorm]),
            ],
            providers: [
                Login,
                CreateUser,
                {
                    provide: 'UserRepository',
                    useClass: UserTypeormRepository,
                },
            ],
        }).compile();

        service = module.get<Login>(Login);
        createUser = module.get<CreateUser>(CreateUser);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a token', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: `a${Math.random()}@a.com`,
            password: '123456',
        });

        const input = {
            id: 1,
            email: 'a@a.com',
        };
        const output = await service.execute(input);
        expect(output).toHaveProperty('token');
    });
});
