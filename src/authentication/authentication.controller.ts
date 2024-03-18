import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Public } from './decorators/auth/auth.decorator';
import { Roles } from './decorators/roles/rol.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  findOne(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.signIn(createAuthenticationDto)
  }


  @Public()
  @Get('profile')
  profileUser() {
    return "Algun perfil"
  }
}

