import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductCategoryPayloadDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly parentId: number;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
