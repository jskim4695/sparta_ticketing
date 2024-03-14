import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTicketingDto {
  @IsInt()
  @IsNotEmpty()
  concertId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  selectedTime: string;
}