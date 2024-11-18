import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationLog } from './schema/notifications.schema';
import { Model } from 'mongoose';
import { UserPreferencesService } from 'src/user-preferences/user-preferences.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private readonly notificationLogModel: Model<NotificationLog>,
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, type, channel, content } = createNotificationDto;

    const preference = await this.userPreferencesService.findOne(userId);

    const channels = ['email', 'sms', 'push'];
    const notificationLogs = [];

    for (let c of channels) {
      const isChannelEnabled = preference.preferences.channels[c];

      try {
        const log = new this.notificationLogModel({
          userId,
          type,
          channel: c,
          status: isChannelEnabled ? 'pending' : 'failed',
          failureReason: !isChannelEnabled ? 'Channel not enabled' : undefined,
          content,
          sentAt: isChannelEnabled ? new Date() : undefined,
        });

        if (isChannelEnabled) {
          log.status = 'sent';
          log.sentAt = new Date();
        }

        await log.save();
        notificationLogs.push(log);
      } catch (err) {
        const failedLog = new this.notificationLogModel({
          userId,
          type,
          channel: c,
          status: 'failed',
          failureReason: err.message,
          content,
        });
        await failedLog.save();
        return failedLog;
      }
    }
    return notificationLogs;
  }

  async findAllLogs(userId: string) {
    const [logs, total] = await Promise.all([
      this.notificationLogModel.find({ userId }).exec(),
      this.notificationLogModel.countDocuments({ userId }).exec(),
    ]);

    if (total === 0) throw new NotFoundException('No user logs found');

    return logs;
  }

  async getStats() {
    const [total, totalSent, totalFailed] = await Promise.all([
      this.notificationLogModel.countDocuments(),
      this.notificationLogModel.countDocuments({ status: 'sent' }),
      this.notificationLogModel.countDocuments({ status: 'failed' }),
    ]);

    return {
      total,
      sent: totalSent,
      failed: totalFailed,
    };
  }
}
