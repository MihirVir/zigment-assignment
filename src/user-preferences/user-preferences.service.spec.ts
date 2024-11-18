import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesService } from './user-preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from './schema/user-preferences.schema';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;

  const mockUserPreferenceModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: mockUserPreferenceModel,
        },
      ],
    }).compile();

    service = module.get<UserPreferencesService>(UserPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
