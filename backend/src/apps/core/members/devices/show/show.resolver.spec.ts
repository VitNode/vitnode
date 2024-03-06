import { Test, TestingModule } from '@nestjs/testing';
import { ShowResolver } from './show.resolver';

describe('ShowResolver', () => {
  let resolver: ShowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowResolver],
    }).compile();

    resolver = module.get<ShowResolver>(ShowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
