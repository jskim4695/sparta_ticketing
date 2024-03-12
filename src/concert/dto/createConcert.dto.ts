import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "../types/concertCategory.type";

export class CreateConcertDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  intro: string

  @IsNotEmpty()
  @IsString()
  concertDate: string

  @IsNotEmpty()
  @IsString()
  concertTime: string

  @IsOptional()
  @IsString()
  concertImg?: string

  @IsNotEmpty()
  category: Category
}