import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authentication;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token.toString(), {
        secret: process.env.JWTSECRET,
      });
      req.body.payload = payload;
      return true;
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      }
    }
  }
}
