import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserSignUpDto } from 'src/auth/dto/user-signup.dto';
import { AuthService } from 'src/auth/service/auth/auth.service';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @ApiCreatedResponse({ description: 'The re' })
  @Post('signup')
  async signup(@Body() user: UserSignUpDto): Promise<UserSignUpDto> {
    return this.usersService.signup(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.usersService.login(req.user);
  }
}
