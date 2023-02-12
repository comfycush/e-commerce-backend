import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class GetProductsQueryDto extends PaginationDto {
  @ApiProperty({
    required: false,
  })
  readonly order?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly orderBy?: string;

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
  readonly category?: string;
}
