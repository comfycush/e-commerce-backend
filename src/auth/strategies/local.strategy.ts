import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
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
    const { role, password, username } = req.body;

    if (!role) {
      throw new BadRequestException('User role is missing');
    }

    const user = await this.authService.validateUser(username, password, role);

    if (!user) {
      return null;
    }

    return user;
  }
}
