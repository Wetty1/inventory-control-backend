import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEventService } from './update-event.service';

describe('UpdateEventService', () => {
  let service: UpdateEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateEventService],
    }).compile();

    service = module.get<UpdateEventService>(UpdateEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
