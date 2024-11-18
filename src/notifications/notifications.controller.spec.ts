import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotificationLog } from './schema/notifications.schema';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  const mockNotificationLogModel = {
    find: jest.fn(),
    countDocuments: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockUserPreferencesService = {
    findOne: jest.fn().mockResolvedValue({
      preferences: {
        channels: { email: true, sms: false, push: true },
      },
    }),
  };

  const mockNotificationsService = {
    create: jest.fn().mockResolvedValue([
      { channel: 'email', status: 'sent' },
      { channel: 'sms', status: 'failed' },
      { channel: 'push', status: 'sent' },
    ]),
    findAllLogs: jest.fn().mockResolvedValue([
      { userId: 'user123', status: 'sent' },
      { userId: 'user123', status: 'failed' },
    ]),
    getStats: jest.fn().mockResolvedValue({
      total: 100,
      sent: 70,
      failed: 30,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: mockNotificationsService,
        },
        {
          provide: getModelToken(NotificationLog.name),
          useValue: mockNotificationLogModel,
        },
        {
          provide: UserPreferencesService,
          useValue: mockUserPreferencesService,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create notifications for enabled channels', async () => {
      const mockDto = {
        userId: 'user123',
        type: 'updates',
        channel: 'email',
        status: 'pending',
        content: { subject: 'Test', body: 'Test notification' },
      };

      const result = await controller.create('', mockDto);

      expect(result).toHaveLength(3);
      expect(result[0].channel).toBe('email');
      expect(result[0].status).toBe('sent');
    });
  });

  describe('findAllLogs', () => {
    it('should return logs for a user', async () => {
      const result = await controller.getLogs('', 'user123');
      expect(result).toHaveLength(2);
      expect(result[0].status).toBe('sent');
    });
  });

  describe('getStats', () => {
    it('should return notification stats', async () => {
      const result = await controller.getStats('');
      expect(result).toEqual({
        total: 100,
        sent: 70,
        failed: 30,
      });
    });
  });
});
