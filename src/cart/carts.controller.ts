import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {}
