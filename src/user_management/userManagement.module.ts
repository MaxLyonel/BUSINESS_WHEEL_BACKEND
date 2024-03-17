import { Module } from "@nestjs/common";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesService } from "./roles/roles.service";
import { RolesController } from "./roles/roles.controller";

@Module({
   imports: [ UsersModule, RolesModule, PermissionsModule, ],
   controllers: [ UsersController, RolesController ],
   providers: [ UsersService, RolesService ]
})

export class UsersManagement {}