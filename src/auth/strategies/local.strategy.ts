import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { Role } from 'src/users/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<any> {
    const { type, password, username } = req.body;

    const role = type ?? Role.CUSTOMER;

    if (!role) {
      throw new BadRequestException('Account Type is missing');
    }

    const user = await this.authService.validateUser(username, password, role);

    if (!user) {
      return null;
    }

    return user;
  }
}
