import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('/dashboard')
    dashboard(@GetUser() user) {
        return this.userService.userDashboard(user)
    }

}
