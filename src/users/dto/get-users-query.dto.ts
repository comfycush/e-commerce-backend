import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/dto/pagination.dto';

export class GetUsersQueryDto extends PaginationDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly order?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly orderBy?: string;
}
