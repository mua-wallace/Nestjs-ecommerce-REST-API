import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    // forwardRef(() => ProductModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120m' },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  exports: [AuthService, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
