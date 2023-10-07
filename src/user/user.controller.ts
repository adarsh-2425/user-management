import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from './schema/user.schema';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Roles(UserRoles.USER)
    @UseGuards(RoleGuard)
    @Get('/dashboard')
    dashboard(@GetUser() user) {
        return this.userService.userDashboard(user)
    }

}
