import { IsOptional, IsString } from 'class-validator';

export class FilterRecipesDto {
  @IsOptional()
  @IsString()
  ingredient?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
