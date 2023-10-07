import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflecor: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflecor.get('roles', context.getHandler());
        const request: any = context.switchToHttp().getRequest();
        
        // Retreive user role from db
        
        const user = await this.userService.getUserById(request.user.sub);
        
        if(user.isBlocked) {
            throw new UnauthorizedException('Your account is blocked. Please Contact Admin')
        }

        const role = user.roles;
        
        if (roles.includes(role)) return true;
        return false;
    }
}