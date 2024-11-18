import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  ValidationPipe,
  Ip,
} from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('preferences')
export class UserPreferencesController {
  private readonly logger = new LoggerService(UserPreferencesController.name);
  constructor(private readonly preferenceService: UserPreferencesService) {}

  @Post()
  create(@Body(ValidationPipe) createPreferenceDto: CreatePreferenceDto) {
    this.logger.log(
      `REQUEST TO CREATE USER PREFERENCE`,
      UserPreferencesController.name,
    );
    return this.preferenceService.create(createPreferenceDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    this.logger.log(
      `REQUEST TO FIND A USER WITH USERID: ${userId}`,
      UserPreferencesController.name,
    );
    return this.preferenceService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updatePreference: Partial<CreatePreferenceDto>,
  ) {
    this.logger.log(
      `REQUEST TO UPDATE USER: ${userId}`,
      UserPreferencesController.name,
    );
    return this.preferenceService.update(userId, updatePreference);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    this.logger.log(
      `REQUEST TO DELETE USER ${userId}`,
      UserPreferencesController.name,
    );
    return this.preferenceService.remove(userId);
  }
}
