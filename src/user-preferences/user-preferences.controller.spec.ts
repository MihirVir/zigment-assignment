import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';
import { CreatePreferenceDto, Frequency } from './dto/create-preference.dto';

describe('UserPreferencesController', () => {
  let controller: UserPreferencesController;
  let service: UserPreferencesService;

  const mockUserPreference = {
    userId: 'user123',
    email: 'test@example.com',
    preferences: {
      marketing: true,
      newsletter: false,
      updates: true,
      frequency: Frequency.DAILY,
      channels: {
        email: true,
        sms: false,
        push: true,
      },
    },
    timezone: 'UTC',
    createdAt: new Date(),
    lastUpdated: new Date(),
    _id: 'someId',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPreferencesController],
      providers: [
        {
          provide: UserPreferencesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUserPreference),
            findOne: jest.fn().mockResolvedValue(mockUserPreference),
            update: jest.fn().mockResolvedValue(mockUserPreference),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserPreferencesController>(
      UserPreferencesController,
    );
    service = module.get<UserPreferencesService>(UserPreferencesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user preference', async () => {
      const dto: CreatePreferenceDto = {
        userId: 'user123',
        email: 'test@example.com',
        preferences: {
          marketing: true,
          newsletter: false,
          updates: true,
          frequency: Frequency.DAILY,
          channels: {
            email: true,
            sms: false,
            push: true,
          },
        },
        timezone: 'UTC',
      };

      const result = await controller.create(dto);
      expect(result).toEqual(mockUserPreference);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
    it('should return a 400 error if userId is empty', async () => {
      const dto: CreatePreferenceDto = {
        userId: '',
        email: 'test@example.com',
        preferences: {
          marketing: true,
          newsletter: false,
          updates: true,
          frequency: Frequency.DAILY,
          channels: {
            email: true,
            sms: false,
            push: true,
          },
        },
        timezone: 'UTC',
      };

      try {
        await controller.create(dto);
      } catch (error) {
        expect(error.response.message).toEqual(['userId should not be empty']);
        expect(error.status).toBe(400);
      }
    });
  });

  describe('findOne', () => {
    it('should return a user preference', async () => {
      const result = await controller.findOne('user123');
      expect(result).toEqual(mockUserPreference);
      expect(service.findOne).toHaveBeenCalledWith('user123');
    });

    it('should return a 404 error if userId is not found', async () => {
      const userId = 'user1231';

      service.findOne = jest.fn().mockResolvedValue(null);

      try {
        await controller.findOne(userId);
      } catch (error) {
        expect(error.response.message).toBe(
          `User with userId: ${userId} not found`,
        );
        expect(error.response.statusCode).toBe(404);
      }
    });
  });
  /*
  cases to test 
    - if userId is correct
    - if wrong userId is provided
  */
  describe('update', () => {
    it('should update a user preference', async () => {
      const userId = 'user123';
      const updatePreference: Partial<CreatePreferenceDto> = {
        email: 'updated@example.com',
      };

      const updatedUserPreference = {
        ...mockUserPreference,
        ...updatePreference,
      };
      service.update = jest.fn().mockResolvedValue(updatedUserPreference);

      const result = await controller.update(userId, updatePreference);

      expect(result).toEqual(updatedUserPreference);
      expect(service.update).toHaveBeenCalledWith(userId, updatePreference);
    });
    it('should return a 404 error if userId is not found', async () => {
      const userId = 'user999';
      const updatePreference: Partial<CreatePreferenceDto> = {
        email: 'nonexistent@example.com',
      };

      service.update = jest.fn().mockResolvedValue(null);

      try {
        await controller.update(userId, updatePreference);
      } catch (error) {
        expect(error.response.message).toBe(
          `User with userId: ${userId} not found`,
        );
        expect(error.response.statusCode).toBe(404);
      }
    });
  });

  /*
  Case to test: 
    - if details are correct
    - if wrong userId is entered
  */
  describe('remove', () => {
    it('should remove a user preference', async () => {
      const userId = 'user123';

      const deleteResult = { deleted: 'user removed' };
      service.remove = jest.fn().mockResolvedValue(deleteResult);

      const result = await controller.remove(userId);
      expect(result).toEqual(deleteResult);
      expect(service.remove).toHaveBeenCalledWith(userId);
    });

    it('should return a 404 error if userId is not found', async () => {
      const userId = 'user999';

      service.remove = jest.fn().mockResolvedValue(null);

      try {
        await controller.remove(userId);
      } catch (error) {
        expect(error.response.message).toBe(
          `User with userId: ${userId} not found`,
        );
        expect(error.response.statusCode).toBe(404);
      }
    });
  });
});
