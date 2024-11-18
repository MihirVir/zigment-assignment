import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './schema/user-preferences.schema';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private readonly userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(
    createPreferenceDto: CreatePreferenceDto,
  ): Promise<UserPreference> {
    return this.userPreferenceModel.create(createPreferenceDto);
  }

  async findOne(userId: string): Promise<UserPreference> {
    const preference = await this.userPreferenceModel
      .findOne({ userId })
      .exec();

    if (!preference)
      throw new NotFoundException(`User with userId: ${userId} not found`);

    return preference;
  }

  async update(
    userId: string,
    updatePreference: Partial<UserPreference>,
  ): Promise<UserPreference> {
    console.log(userId);
    const up = await this.userPreferenceModel
      .findOneAndUpdate(
        { userId },
        { ...updatePreference, lastUpdated: new Date() },
        { new: true },
      )
      .exec();

    if (!up)
      throw new NotFoundException(`User with userId: ${userId} not found`);

    return up;
  }

  async remove(userId: string): Promise<{ message: string }> {
    const result = await this.userPreferenceModel.deleteOne({ userId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with userId: ${userId} not found`);
    }

    return { message: 'user removed' };
  }
}
