import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
    constructor(private readonly userService: UserService){}

    // Block User
    async blockUser(id: string) {
        const user = await this.userService.getUserById(id);
        if (user.isBlocked) {
            return `${user.username} is already blocked`
        }
        user.isBlocked = true;
        user.save()
        return `${user.username} is blocked`
    }

    // Unblock user
    async unblockUser(id: string) {
        const user = await this.userService.getUserById(id);
        if (!user.isBlocked) {
            return `${user.username} is not blocked`
        }
        user.isBlocked = false;
        user.save()
        return `${user.username} is unblocked`
    }

}
