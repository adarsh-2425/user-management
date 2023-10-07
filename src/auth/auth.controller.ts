import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from 'src/user/schema/user.schema';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Public()
    @Post('signup')
    signup(@Body() dto) {
        return this.authService.signup(dto);
    }

    @Public()
    @Post('login')
    login(@Body() dto) {
        return this.authService.login(dto)
    }

}
