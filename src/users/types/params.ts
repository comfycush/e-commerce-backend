import { Role } from '../constants';

export interface findByUsernameParams {
  readonly username: string;
  readonly role: Role;
}
