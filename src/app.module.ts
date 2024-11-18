import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    UserPreferencesModule,
    ThrottlerModule.forRoot([{ name: 'ratelimiter', ttl: 60000, limit: 1000 }]),
    MongooseModule.forRoot(
      (process.env.MONGO_URI as string) || 'mongodb://localhost:27017/zigment',
    ),
    NotificationsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
