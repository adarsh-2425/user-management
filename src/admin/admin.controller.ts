import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AdminService } from './admin.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from 'src/user/schema/user.schema';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Roles(UserRoles.ADMIN)
    @UseGuards(RoleGuard)
    @Post('block/:id')
    blockUser(@Param('id') id) {
        return this.adminService.blockUser(id)
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RoleGuard)
    @Post('unblock/:id')
    unblockUser(@Param('id') id) {
        return this.adminService.unblockUser(id)
    }
}
