import {
  IsEmail,
  IsString,
  IsObject,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
export enum Frequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  NEVER = 'never',
}
export class CreatePreferenceDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsObject()
  @IsNotEmpty()
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;

    frequency: 'daily' | 'weekly' | 'monthly' | 'never';

    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @IsString()
  @IsNotEmpty()
  timezone: string;
}
