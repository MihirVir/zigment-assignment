import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  Ip,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('notifications')
export class NotificationsController {
  private readonly logger = new LoggerService(NotificationsController.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  create(
    @Ip() ip: string,
    @Body(ValidationPipe) createNotificationDto: CreateNotificationDto,
  ) {
    this.logger.log(
      `REQUEST TO CREATE LOG FROM ${ip}`,
      NotificationsController.name,
    );
    return this.notificationsService.create(createNotificationDto);
  }

  @Get('stats')
  getStats(@Ip() ip: string) {
    this.logger.log(
      `REQUEST TO GET STATS FROM ${ip}`,
      NotificationsController.name,
    );
    return this.notificationsService.getStats();
  }

  @Get(':userId/logs')
  getLogs(@Ip() ip: string, @Param('userId') userId: string) {
    this.logger.log(
      `REQUEST TO GET ALL LOGS WITH USERID: ${userId} AND IP: ${ip}`,
      NotificationsController.name,
    );
    return this.notificationsService.findAllLogs(userId);
  }
}
