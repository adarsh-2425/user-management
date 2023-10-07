import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from '@nestjs/passport';
import { UserService } from "src/user/user.service";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService
        ) {
        super();
    }
    
    /*The canActivate method is an asynchronous method that determines whether a route 
    should be activated or not based on the authentication status 
    and the 'isPublic' metadata.*/
    async canActivate(context: ExecutionContext): Promise<any> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

         // Retrieve the user from the token
         const request = context.switchToHttp().getRequest();
         const user = request.user; 

        return super.canActivate(context);
    }
}