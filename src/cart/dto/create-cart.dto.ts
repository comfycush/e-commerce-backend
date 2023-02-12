import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  readonly userId: number;
}
