import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AdminService } from './admin.service';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Public()
    @Post('block/:id')
    blockUser(@Param('id') id) {
        return this.adminService.blockUser(id)
    }

    @Public()
    @Post('unblock/:id')
    unblockUser(@Param('id') id) {
        return this.adminService.unblockUser(id)
    }
}
