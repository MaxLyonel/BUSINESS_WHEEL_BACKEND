import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user_management/users/users.service';
import { UpdateUserDto } from 'src/user_management/users/dto/update-user.dto';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(createAuthDto: CreateAuthenticationDto) {
    const user = await this.validate(createAuthDto)
    if (! user )
      return [{
        error: true,
        message: "Usuario no autenticado",
        data: []
      }]

    if(! await this.userService.activeUser(user.id))
      return [{
        error: true,
        message: 'Usuario deshabilitado',
        data: []
      }]

    const payload = {
      id: user.id,
      roles: user.role,
      expiresIn: 60
    }

    const jwtToken = this.jwtService.sign(payload)
    const authenticatedUser = { ...user, jwtToken }
    const updateUser: UpdateUserDto = await this.userService.findOne(user.id)
    updateUser.token = jwtToken
    this.userService.update(user.id, {...updateUser})
    return [
      {
        error: false,
        message: "Usuario autenticado exitosamente",
        data: authenticatedUser
      }
    ]
  }
  async validate(createAuthDto: CreateAuthenticationDto) {
    const isUser = await this.userService.findUser(createAuthDto.username, createAuthDto.password)
    return isUser ?? null
  }
}
