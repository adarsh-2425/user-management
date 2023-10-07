import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async signup(dto) {
        return this.userService.signup(dto)
    }

    async login(dto) {
        return this.userService.login(dto);
    }

}
