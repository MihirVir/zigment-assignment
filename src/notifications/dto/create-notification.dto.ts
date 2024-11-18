import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(['marketing', 'newletter', 'updates'])
  type: string;

  @IsEnum(['email', 'sms', 'push'])
  channel: string;

  @IsEnum(['pending', 'sent', 'failed'])
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  failureReason?: string;

  @IsDateString()
  @IsOptional()
  sentAt?: Date;

  @IsOptional()
  metadata?: Record<string, any>;

  @IsOptional()
  content?: Record<string, any>;
}
