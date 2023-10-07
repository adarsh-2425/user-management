import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean } from "class-validator";
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})

export class User extends Document {

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: 'user'})
    roles: string;

    @Prop({default: false})
    @IsBoolean()
    isBlocked: boolean

}

export const UserSchema = SchemaFactory.createForClass(User);

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user'
}