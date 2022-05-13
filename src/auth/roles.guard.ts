import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth/auth.service';
import { Users } from './user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: Users = request.user;
    // return roles.some((role) => user.roles?.includes(role));
    console.log(user);
    return true;
  }
}
