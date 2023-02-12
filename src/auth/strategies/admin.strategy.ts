import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Role } from 'src/users/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authService.getProfile(payload.userId);

    if (user.role !== Role.ADMIN || !user.status) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
