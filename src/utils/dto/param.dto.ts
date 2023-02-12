import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class ParamDto {
  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
