import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { getResponseFormat } from 'src/utils/misc';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { RegisterUserPayloadDto } from './dto/register-user-payload.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'), ThrottlerGuard)
  @Throttle(2, 1)
  @Post('login')
  async login(@Body() payload: LoginPayloadDto, @Request() req) {
    return getResponseFormat(200, 'Login success', {
      username: req.user.username,
      accessToken: await this.authService.generateAuthToken(
        req.user.username,
        req.user.role,
      ),
    });
  }

  @ApiOperation({
    summary: 'Customer Registration',
  })
  @Post('customer/register')
  async customerRegister(@Body() payload: RegisterUserPayloadDto) {
    const customer = await this.authService.registerCustomer(payload);
    return getResponseFormat(200, 'Customer successfully registered', {
      username: customer.username,
      email: customer.email,
    });
  }
}
