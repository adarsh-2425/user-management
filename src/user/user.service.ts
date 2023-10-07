import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import * as jwt from 'jsonwebtoken'
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtPayload } from 'src/auth/stategies';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    // SignUp
    async signup(dto: SignUpDto): Promise<{message: string}> {
        // check if user exists
        const userExists = await this.userModel.findOne({email: dto.email}); 

        //custom validation mesage for email already exists
        if (userExists) {
            throw new HttpException(
              'Email already exists. Please log in to your account.',
              HttpStatus.CONFLICT,
            );
          }

        // Hash the password
        const hashedPassword= await bcrypt.hash(dto.password, 10);

        // Saving user
        const newUser = new this.userModel({
            username: dto.username,
            email: dto.email,
            password: hashedPassword
        })

        await newUser.save();

        return {
            "message": "Signup Success. You Can Login To Your Account Now"
        }
    }

    // Login
    async login(dto: LoginDto): Promise<{message: string, token: string}> {

        const foundUser = await this.userModel.findOne({email: dto.email});
        // Email is wrong or user does not exist
        if (!foundUser) {
            throw new HttpException(
                'User Not Found. Please Check Your Credentials or Create an Account',
                HttpStatus.NOT_FOUND
            )
            
        }

        if(foundUser.isBlocked) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,   
                    error: 'You are Blocked. Please Contact Admin'
                },
                HttpStatus.FORBIDDEN
            )
        }

        // decrypt the password
        const isPasswordValid = await bcrypt.compare(dto.password, foundUser.password);
        console.log(isPasswordValid)
        // if password is wrong
        if (!isPasswordValid) {
            throw new HttpException(
                'Password is wrong',
                HttpStatus.BAD_REQUEST
            )
        }

        const payload = {
          sub: foundUser._id,
        }

        // Generate JWT token
        const token = jwt.sign(payload, process.env.secret, {
            expiresIn: 3600
        });
            
        return {
            "message": "Login Successful",
            "token": token
        }

    }

    // Get User By Id
    async getUserById(id: string) {        
        return await this.userModel.findById(id);   
    }

    // User Dashboard
    async userDashboard(user: JwtPayload) {
        const User = await this.userModel.findById(user.sub)
        return `Welcome ${User.username}`
        
    }

    
}

