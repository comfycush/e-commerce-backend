import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangeUserStatusDto } from 'src/cart/dto/change-user-status.dto';
import { ParamDto } from 'src/utils/dto/param.dto';
import { getResponseFormat } from 'src/utils/misc';
import { Role } from './constants';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* Using Admin auth start */
  @ApiBearerAuth()
  @Get('')
  @UseGuards(AuthGuard('admin'))
  async getList(@Query() query: GetUsersQueryDto) {
    return getResponseFormat(
      200,
      'Admin List',
      await this.usersService.getUsersByRole(Role.ADMIN, query),
    );
  }

  @ApiBearerAuth()
  @Put(':id/status')
  @UseGuards(AuthGuard('admin'))
  async changeAdminStatus(
    @Param() { id }: ParamDto,
    @Body() { status }: ChangeUserStatusDto,
  ) {
    return getResponseFormat(
      200,
      'Successfully changed admin status',
      this.usersService.changeUserStatus(id, status),
    );
  }
  /* Using Admin auth end */

  @Put('customers/:id')
  @UseGuards(AuthGuard('customer'))
  async update(@Param() params: ParamDto, @Body() payload: UpdateUserDto) {
    await this.usersService.update(params.id, payload);
    return getResponseFormat(200, 'User detail updated', payload);
  }
}
