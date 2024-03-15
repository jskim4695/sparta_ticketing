import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { pick } from 'lodash';
import { Ticketing } from '../entities/ticketing.entity';

export class CreateTicketingDto {
  @IsInt()
  @IsNotEmpty()
  scheduleId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  selectedTime: string;
}