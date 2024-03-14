import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "../types/concertCategory.type";
import { PerformPlace } from "../types/performPlace.type";

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
  @IsArray()
  @IsString({ each: true})
  concertTime: string[]

  @IsNotEmpty()
  @IsString()
  place: PerformPlace

  @IsOptional()
  @IsString()
  concertImg?: string

  @IsNotEmpty()
  category: Category
}