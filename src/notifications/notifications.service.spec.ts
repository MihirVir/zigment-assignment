import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const mockNotificationLogModel = {
      create: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: 'NotificationLogModel',
          useValue: mockNotificationLogModel,
        },
        {
          provide: UserPreferencesService,
          useValue: {
            getPreferences: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
