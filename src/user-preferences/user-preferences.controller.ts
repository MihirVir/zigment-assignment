import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('preferences')
export class UserPreferencesController {
  constructor(private readonly preferenceService: UserPreferencesService) {}

  @Post()
  create(@Body(ValidationPipe) createPreferenceDto: CreatePreferenceDto) {
    return this.preferenceService.create(createPreferenceDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.preferenceService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updatePreference: Partial<CreatePreferenceDto>,
  ) {
    return this.preferenceService.update(userId, updatePreference);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.preferenceService.remove(userId);
  }
}
