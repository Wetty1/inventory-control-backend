import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEventService } from './delete-event.service';

describe('DeleteEventService', () => {
  let service: DeleteEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteEventService],
    }).compile();

    service = module.get<DeleteEventService>(DeleteEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
