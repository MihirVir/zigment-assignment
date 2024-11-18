import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NotificationLog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['marketing', 'newsletter', 'updates'] })
  type: string;

  @Prop({ required: true, enum: ['push', 'sms', 'email'] })
  channel: string;

  @Prop({ enum: ['pending', 'sent', 'failed'] })
  status: string;

  @Prop()
  sentAt?: Date;

  @Prop()
  failureReason?: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Object })
  content: Record<string, any>;
}

export const NotificationLogSchema =
  SchemaFactory.createForClass(NotificationLog);
