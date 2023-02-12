import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserStatusDto {
  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;
}
