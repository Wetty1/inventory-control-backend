import { Test, TestingModule } from '@nestjs/testing';
import { DesableUser } from './desable-user';

describe('DesableUser', () => {
    let service: DesableUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DesableUser],
        }).compile();

        service = module.get<DesableUser>(DesableUser);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
