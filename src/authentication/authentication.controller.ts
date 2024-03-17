import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Public } from './decorators/auth/auth.decorator';
import { Roles } from './decorators/roles/rol.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  findOne(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.signIn(createAuthenticationDto)
  }

  @Roles('admin')
  @Get('profile')
  profileUser() {
    return "Algun perfil"
  }
}

